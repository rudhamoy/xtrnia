import { NextRequest, NextResponse } from 'next/server';

function isAllowedUrl(target: URL) {
  return target.hostname.endsWith('res.cloudinary.com');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ success: false, message: 'Missing url' }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(url);
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid url' }, { status: 400 });
  }

  if (!isAllowedUrl(target)) {
    return NextResponse.json({ success: false, message: 'URL not allowed' }, { status: 400 });
  }

  try {
    const range = request.headers.get('range');
    const headers: HeadersInit = range ? { range } : {};
    const response = await fetch(target.toString(), { headers });

    if (!response.ok) {
      return NextResponse.json({ success: false, message: 'Failed to fetch PDF' }, { status: 502 });
    }

    const contentLength = response.headers.get('content-length') || undefined;
    const contentRange = response.headers.get('content-range') || undefined;

    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="instructions.pdf"',
        'Cache-Control': 'public, max-age=3600',
        'Accept-Ranges': 'bytes',
        ...(contentLength ? { 'Content-Length': contentLength } : {}),
        ...(contentRange ? { 'Content-Range': contentRange } : {}),
      },
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Failed to fetch PDF' }, { status: 502 });
  }
}
