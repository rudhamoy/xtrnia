import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Middleware to verify admin
function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// GET - Fetch all competitions (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'current' or 'upcoming'
    const status = searchParams.get('status'); // 'active' or 'inactive'

    const where: { type?: string; status?: string } = {};

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    const competitions = await prisma.competition.findMany({
      where,
      orderBy: [
        { type: 'asc' },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    // Parse prizes JSON string back to array
    const competitionsWithParsedPrizes = competitions.map(comp => ({
      ...comp,
      prizes: JSON.parse(comp.prizes),
    }));

    return NextResponse.json(
      { success: true, data: competitionsWithParsedPrizes },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch competitions' },
      { status: 500 }
    );
  }
}

// POST - Create a new competition (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin
    const admin = verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Convert prizes array to JSON string for storage
    const competition = await prisma.competition.create({
      data: {
        name: body.name,
        badge: body.badge,
        date: body.date,
        image: body.image,
        category: body.category,
        minClass: body.minClass,
        maxClass: body.maxClass,
        prizes: JSON.stringify(body.prizes),
        type: body.type,
        status: body.status || 'active',
        order: body.order || 0,
      },
    });

    // Parse prizes back to array for response
    const competitionResponse = {
      ...competition,
      prizes: JSON.parse(competition.prizes),
    };

    return NextResponse.json(
      { success: true, data: competitionResponse },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating competition:', error);

    return NextResponse.json(
      { success: false, message: 'Failed to create competition', error: String(error) },
      { status: 500 }
    );
  }
}
