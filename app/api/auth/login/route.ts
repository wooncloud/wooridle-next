import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, password } = body;

    // 입력 검증
    if (!userId || !password) {
      return NextResponse.json(
        { error: '아이디와 패스워드를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 외부 API로 요청 전달
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    const apiResponse = await fetch(`${apiBaseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: data.message || '로그인에 실패했습니다.' },
        { status: apiResponse.status }
      );
    }

    // 성공 응답 (토큰이나 사용자 정보 반환)
    return NextResponse.json(
      {
        message: '로그인이 완료되었습니다.',
        user: data.user,
        token: data.token
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}