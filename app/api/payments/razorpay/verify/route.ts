import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { verifyRazorpaySignature } from '@/lib/payments/razorpay';

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { registrationId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!registrationId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: 'Missing payment verification data' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const registration = await prisma.registration.findFirst({
      where: { id: registrationId, userId: user.id },
    });

    if (!registration) {
      return NextResponse.json({ success: false, message: 'Registration not found' }, { status: 404 });
    }

    if (registration.paymentStatus === 'PAID') {
      return NextResponse.json({ success: true });
    }

    if (registration.paymentOrderId && registration.paymentOrderId !== razorpay_order_id) {
      return NextResponse.json({ success: false, message: 'Order mismatch' }, { status: 400 });
    }

    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!isValid) {
      await prisma.registration.update({
        where: { id: registration.id },
        data: {
          paymentStatus: 'FAILED',
          paymentError: 'Signature verification failed',
        },
      });
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }

    await prisma.registration.update({
      where: { id: registration.id },
      data: {
        paymentStatus: 'PAID',
        paymentOrderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        paymentPaidAt: new Date(),
        paymentError: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment verification failed:', error);
    return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 500 });
  }
}
