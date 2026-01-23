import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';

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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type - Only PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only PDF files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (20MB max for brochures)
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 20MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'xtrnia/brochures',
          resource_type: 'raw', // Important for PDFs (not images)
          format: 'pdf',
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve(result);
          else reject(new Error('Upload failed with no result'));
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      message: 'Brochure uploaded successfully',
      fileUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      fileSize: uploadResult.bytes,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload brochure' },
      { status: 500 }
    );
  }
}
