import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    console.log(req.url);
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '12';
    const category = searchParams.get('category') || null;

    let fetchUrl = '';

    if (category) {
      // 카테고리가 있는 경우
      fetchUrl = `http://localhost:4000/naverapi/newsdata?page=${page}&limit=${limit}&category=${encodeURIComponent(
        category,
      )}`;
    } else {
      // 카테고리가 없는 경우
      fetchUrl = `http://localhost:4000/naverapi/newsdata?page=${page}&limit=${limit}`;
    }

    // 백엔드로 요청 보내기
    const backendResponse = await fetch(fetchUrl);

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
