import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Verify admin token
function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch {
    return null;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const admin = verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Get the competition
    const competition = await prisma.competition.findUnique({
      where: { id },
    });

    if (!competition) {
      return NextResponse.json(
        { success: false, message: 'Competition not found' },
        { status: 404 }
      );
    }

    // Toggle type: if current -> upcoming, if upcoming -> current
    const newType = competition.type === 'current' ? 'upcoming' : 'current';

    // If switching to current, set all other competitions to upcoming
    // (Only one competition can be current at a time)
    if (newType === 'current') {
      await prisma.competition.updateMany({
        where: {
          type: 'current',
        },
        data: {
          type: 'upcoming',
        },
      });
    }

    // Update this competition
    const updatedCompetition = await prisma.competition.update({
      where: { id },
      data: {
        type: newType,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Competition ${newType === 'current' ? 'set as current' : 'moved to upcoming only'}`,
      data: {
        ...updatedCompetition,
        prizes: JSON.parse(updatedCompetition.prizes),
      },
    });

  } catch (error) {
    console.error('Error toggling competition type:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
