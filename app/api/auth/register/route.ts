import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, password, name, email } = body;

    // 입력 검증
    if (!userId || !password || !name || !email) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 패스워드 최소 요구사항 검증 (8자 이상)
    if (password.length < 8) {
      return NextResponse.json(
        { error: '패스워드는 최소 8자 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    // 외부 API로 요청 전달
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    const apiResponse = await fetch(`${apiBaseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        password,
        name,
        email,
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: data.message || '회원가입에 실패했습니다.' },
        { status: apiResponse.status }
      );
    }

    // 성공 응답 (민감한 정보는 제외하고 반환)
    return NextResponse.json(
      {
        message: '회원가입이 완료되었습니다.',
        userId: data.userId
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Register API Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}