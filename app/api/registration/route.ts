
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(request: NextRequest) {
  try {
    const registrations = await prisma.registration.findMany({
      include: {
        competition: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Failed to fetch registrations.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // Destructure all expected fields
    const {
      schoolName,
      schoolAddress,
      teacherName,
      studentRep1Name,
      studentRep2Name,
      classInfo,
      teachersParticipating,
      totalAmount,
      transactionId,
      competitionId
    } = data;

    // Basic validation (can be expanded)
    if (!schoolName || !schoolAddress || !teacherName || !studentRep1Name || !studentRep2Name || !classInfo || !teachersParticipating || !totalAmount || !transactionId) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    const registration = await prisma.registration.create({
      data: {
        schoolName,
        schoolAddress,
        teacherName,
        studentRep1Name,
        studentRep2Name,
        classInfo,
        teachersParticipating,
        totalAmount,
        transactionId,
        competitionId: competitionId || null,
      },
    });

    return NextResponse.json({ success: true, data: registration });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Registration failed.' }, { status: 500 });
  }
}
