import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { createRazorpayOrder, getRazorpayKeyId } from '@/lib/payments/razorpay';

function parseAmountToPaise(raw: string): number | null {
  const normalized = raw.replace(/[,\s]+/g, '').trim();
  if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(normalized)) {
    return null;
  }
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }
  return Math.round(value * 100);
}

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { registrationId } = body;
    if (!registrationId) {
      return NextResponse.json({ success: false, message: 'Missing registrationId' }, { status: 400 });
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
      return NextResponse.json({ success: false, message: 'Payment already completed' }, { status: 400 });
    }

    const amount = parseAmountToPaise(registration.totalAmount);
    if (!amount) {
      return NextResponse.json({ success: false, message: 'Invalid total amount' }, { status: 400 });
    }

    const order = await createRazorpayOrder({
      amount,
      currency: 'INR',
      receipt: registration.id,
      notes: {
        registrationId: registration.id,
      },
    });

    await prisma.registration.update({
      where: { id: registration.id },
      data: {
        paymentAmount: amount,
        paymentCurrency: 'INR',
        paymentGateway: 'RAZORPAY',
        paymentStatus: 'PENDING',
        paymentOrderId: order.id,
        paymentError: null,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: getRazorpayKeyId(),
    });
  } catch (error) {
    console.error('Failed to create Razorpay order:', error);
    return NextResponse.json({ success: false, message: 'Failed to create order' }, { status: 500 });
  }
}
