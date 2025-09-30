import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    const apiResponse = await fetch(`${apiBaseUrl}/api/comments/post/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: data.message || '댓글을 불러오는데 실패했습니다.' },
        { status: apiResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error('Comments API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
