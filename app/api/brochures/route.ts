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

// GET - Fetch all brochures (admin only)
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const brochures = await prisma.brochure.findMany({
      orderBy: [
        { isActive: 'desc' }, // Active first
        { createdAt: 'desc' }
      ],
    });

    return NextResponse.json({
      success: true,
      data: brochures,
    });
  } catch (error) {
    console.error('Error fetching brochures:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch brochures' },
      { status: 500 }
    );
  }
}

// POST - Create new brochure entry
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = verifyAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, fileUrl, publicId, fileSize } = body;

    if (!name || !fileUrl || !publicId || !fileSize) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const brochure = await prisma.brochure.create({
      data: {
        name,
        fileUrl,
        publicId,
        fileSize: parseInt(fileSize),
        isActive: false, // New brochures are inactive by default
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Brochure created successfully',
      data: brochure,
    });
  } catch (error) {
    console.error('Error creating brochure:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create brochure' },
      { status: 500 }
    );
  }
}
