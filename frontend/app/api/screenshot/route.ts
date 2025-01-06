import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: '유효한 URL 매개변수가 필요합니다.' },
        { status: 400 },
      );
    }

    // 백엔드로 요청 보내기
    const backendResponse = await fetch(
      'http://localhost:4000/api/screenshot/oneNewsShot',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }), // JSON으로 전달
      },
    );

    if (!backendResponse.ok) {
      throw new Error(`HTTP Error: ${backendResponse.status}`);
    }

    const responseData = await backendResponse.json();
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    return NextResponse.json(
      { error: '백엔드 요청 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
