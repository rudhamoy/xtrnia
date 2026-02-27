import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ success: true, data: [] });
    }

    const registrations = await prisma.registration.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        schoolName: true,
        schoolAddress: true,
        teacherName: true,
        teachersParticipating: true,
        totalAmount: true,
        transactionId: true,
        competitionId: true,
        createdAt: true,
        competition: {
          select: {
            id: true,
            name: true,
            date: true,
            badge: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    console.error('Failed to fetch user registrations:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch your registrations.' },
      { status: 500 }
    );
  }
}
