import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const admin = verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const registrations = await prisma.registration.findMany({
      include: {
        competition: true,
        user: {
          select: {
            clerkId: true,
            email: true,
            fullName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: registrations });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch registrations.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json(
        { success: false, message: 'Please sign in before registering.' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const {
      institutionType,
      schoolName,
      schoolAddress,
      teacherName,
      teacherPhone,
      participationOptions,
      competitionId,
    } = data;

    if (
      !institutionType ||
      !schoolName ||
      !schoolAddress ||
      !teacherName ||
      !teacherPhone ||
      !Array.isArray(participationOptions) ||
      participationOptions.length === 0 ||
      !competitionId
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    if (institutionType !== 'SCHOOL' && institutionType !== 'COLLEGE') {
      return NextResponse.json(
        { success: false, message: 'Invalid institution type.' },
        { status: 400 }
      );
    }

    const competition = await prisma.competition.findUnique({
      where: { id: competitionId },
      select: { minClass: true, maxClass: true },
    });

    if (!competition) {
      return NextResponse.json(
        { success: false, message: 'Competition not found.' },
        { status: 404 }
      );
    }

    const normalizedValues = participationOptions.map((value: string) => String(value).trim());

    let selections: string[] = [];
    let totalAmount = '0';

    if (institutionType === 'SCHOOL') {
      const hasTeacher = normalizedValues.includes('Teacher');
      const classValues = normalizedValues.filter((value) => value !== 'Teacher');
      const parsedClasses = classValues
        .map((value) => Number.parseInt(String(value), 10))
        .filter((value: number) => Number.isFinite(value));

      if (parsedClasses.length !== classValues.length) {
        return NextResponse.json(
          { success: false, message: 'Invalid class selection.' },
          { status: 400 }
        );
      }

      const isOutOfRange = parsedClasses.some(
        (value: number) => value < competition.minClass || value > competition.maxClass
      );

      if (isOutOfRange) {
        return NextResponse.json(
          { success: false, message: 'Selected classes are outside competition range.' },
          { status: 400 }
        );
      }

      const uniqueClasses = Array.from(new Set(parsedClasses)).sort((a, b) => a - b);
      if (uniqueClasses.length === 0 && !hasTeacher) {
        return NextResponse.json(
          { success: false, message: 'Select at least one class.' },
          { status: 400 }
        );
      }

      selections = hasTeacher ? [...uniqueClasses.map(String), 'Teacher'] : uniqueClasses.map(String);
      totalAmount = String(selections.length * 750);
    } else {
      const allowedCollege = new Set(['Men', 'Women']);
      const filtered = normalizedValues.filter((value) => allowedCollege.has(value));
      const uniqueCollege = Array.from(new Set(filtered));
      if (uniqueCollege.length === 0) {
        return NextResponse.json(
          { success: false, message: 'Select at least one group.' },
          { status: 400 }
        );
      }

      if (uniqueCollege.length !== normalizedValues.length) {
        return NextResponse.json(
          { success: false, message: 'Invalid group selection.' },
          { status: 400 }
        );
      }

      selections = uniqueCollege;
      totalAmount = String(selections.length * 1000);
    }

    const client = await clerkClient();
    const clerkUser = await client.users.getUser(clerkUserId);
    const primaryEmail = clerkUser.emailAddresses.find(
      (entry: { id: string; emailAddress: string }) =>
        entry.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    const appUser = await prisma.user.upsert({
      where: { clerkId: clerkUserId },
      update: {
        email: primaryEmail || null,
        fullName: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || null,
      },
      create: {
        clerkId: clerkUserId,
        email: primaryEmail || null,
        fullName: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || null,
      },
    });

    const registration = await prisma.registration.create({
      data: {
        institutionType,
        schoolName,
        schoolAddress,
        teacherName,
        teacherPhone,
        participationOptions: selections,
        totalAmount,
        paymentStatus: "PENDING",
        paymentGateway: "RAZORPAY",
        paymentCurrency: "INR",
        competitionId,
        userId: appUser.id,
      },
    });

    return NextResponse.json({ success: true, data: registration });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Registration failed.' },
      { status: 500 }
    );
  }
}
