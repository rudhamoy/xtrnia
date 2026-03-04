import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyRazorpayWebhookSignature } from '@/lib/payments/razorpay';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    const isValid = verifyRazorpayWebhookSignature(payload, signature);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(payload);
    const eventType = event.event as string;

    if (eventType === 'payment.captured') {
      const payment = event.payload?.payment?.entity;
      if (payment?.order_id) {
        await prisma.registration.updateMany({
          where: { paymentOrderId: payment.order_id },
          data: {
            paymentStatus: 'PAID',
            paymentId: payment.id,
            paymentPaidAt: new Date(payment.created_at * 1000),
            paymentError: null,
          },
        });
      }
    }

    if (eventType === 'payment.failed') {
      const payment = event.payload?.payment?.entity;
      if (payment?.order_id) {
        await prisma.registration.updateMany({
          where: { paymentOrderId: payment.order_id },
          data: {
            paymentStatus: 'FAILED',
            paymentId: payment.id,
            paymentError: payment.error_description || 'Payment failed',
          },
        });
      }
    }

    if (eventType === 'refund.processed' || eventType === 'refund.created') {
      const refund = event.payload?.refund?.entity;
      if (refund?.payment_id) {
        await prisma.registration.updateMany({
          where: { paymentId: refund.payment_id },
          data: {
            paymentStatus: 'REFUNDED',
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Razorpay webhook error:', error);
    return NextResponse.json({ success: false, message: 'Webhook error' }, { status: 500 });
  }
}
