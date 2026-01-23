import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch active brochure (public, no auth required)
export async function GET() {
  try {
    const activeBrochure = await prisma.brochure.findFirst({
      where: { isActive: true },
    });

    if (!activeBrochure) {
      return NextResponse.json({
        success: false,
        message: 'No active brochure found',
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        name: activeBrochure.name,
        fileUrl: activeBrochure.fileUrl,
      },
    });
  } catch (error) {
    console.error('Error fetching active brochure:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch active brochure' },
      { status: 500 }
    );
  }
}
