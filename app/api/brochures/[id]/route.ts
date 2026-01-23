import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import cloudinary from '@/lib/cloudinary';

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

// PUT - Update brochure (mainly for setting active)
export async function PUT(
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
    const body = await request.json();
    const { isActive, name } = body;

    // If setting this brochure as active, deactivate all others first
    if (isActive === true) {
      await prisma.$transaction([
        // Deactivate all brochures
        prisma.brochure.updateMany({
          where: { isActive: true },
          data: { isActive: false }
        }),
        // Activate the selected brochure
        prisma.brochure.update({
          where: { id },
          data: { isActive: true }
        })
      ]);

      const updatedBrochure = await prisma.brochure.findUnique({
        where: { id }
      });

      return NextResponse.json({
        success: true,
        message: 'Brochure activated successfully',
        data: updatedBrochure,
      });
    }

    // Update brochure (name or other fields)
    const brochure = await prisma.brochure.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Brochure updated successfully',
      data: brochure,
    });
  } catch (error) {
    console.error('Error updating brochure:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update brochure' },
      { status: 500 }
    );
  }
}

// DELETE - Delete brochure
export async function DELETE(
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

    // Get brochure details to delete from Cloudinary
    const brochure = await prisma.brochure.findUnique({
      where: { id },
    });

    if (!brochure) {
      return NextResponse.json(
        { success: false, message: 'Brochure not found' },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(brochure.publicId, {
        resource_type: 'raw',
      });
    } catch (cloudinaryError) {
      console.error('Cloudinary deletion error:', cloudinaryError);
      // Continue with DB deletion even if Cloudinary fails
    }

    // Delete from database
    await prisma.brochure.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Brochure deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting brochure:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete brochure' },
      { status: 500 }
    );
  }
}
