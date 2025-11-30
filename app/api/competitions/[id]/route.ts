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

// GET - Fetch single competition by ID (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const competition = await prisma.competition.findUnique({
      where: { id },
    });

    if (!competition) {
      return NextResponse.json(
        { success: false, message: 'Competition not found' },
        { status: 404 }
      );
    }

    // Parse prizes JSON string back to array
    const competitionResponse = {
      ...competition,
      prizes: JSON.parse(competition.prizes),
    };

    return NextResponse.json(
      { success: true, data: competitionResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching competition:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch competition' },
      { status: 500 }
    );
  }
}

// PUT - Update competition by ID (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin
    const admin = verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const competition = await prisma.competition.update({
      where: { id },
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
        status: body.status,
        order: body.order,
      },
    });

    // Parse prizes back to array for response
    const competitionResponse = {
      ...competition,
      prizes: JSON.parse(competition.prizes),
    };

    return NextResponse.json(
      { success: true, data: competitionResponse },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error updating competition:', error);

    if (String(error).includes('Record to update not found')) {
      return NextResponse.json(
        { success: false, message: 'Competition not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to update competition', error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Delete competition by ID (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin
    const admin = verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.competition.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: 'Competition deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting competition:', error);

    if (String(error).includes('Record to delete does not exist')) {
      return NextResponse.json(
        { success: false, message: 'Competition not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to delete competition' },
      { status: 500 }
    );
  }
}
