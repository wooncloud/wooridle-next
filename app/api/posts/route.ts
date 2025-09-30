import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '0';
    const size = searchParams.get('size') || '50';

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    const apiResponse = await fetch(`${apiBaseUrl}/api/posts?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: data.message || '게시글을 불러오는데 실패했습니다.' },
        { status: apiResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Posts API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authorization = request.headers.get('authorization');
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const token = authorization.replace('Bearer ', '');

    const body = await request.json();
    const { title, content } = body;

    // 입력 검증
    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    if (title.trim().length === 0 || content.trim().length === 0) {
      return NextResponse.json(
        { error: '제목과 내용을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 제목 길이 검증
    if (title.length > 200) {
      return NextResponse.json(
        { error: '제목은 200자 이하로 입력해주세요.' },
        { status: 400 }
      );
    }

    // 내용 길이 검증 (10000자 제한)
    if (content.length > 10000) {
      return NextResponse.json(
        { error: '내용은 10,000자 이하로 입력해주세요.' },
        { status: 400 }
      );
    }

    // 외부 API로 요청 전달 (토큰 포함)
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    const apiResponse = await fetch(`${apiBaseUrl}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title.trim(),
        content: content.trim(),
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: data.message || '게시글 작성에 실패했습니다.' },
        { status: apiResponse.status }
      );
    }

    // 성공 응답
    return NextResponse.json(
      {
        message: '게시글이 성공적으로 작성되었습니다.',
        post: data
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Posts API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}