'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  userId: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 에러 상태 초기화
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.userId.trim()) {
      newErrors.userId = '아이디를 입력해주세요.';
    }

    if (!formData.password) {
      newErrors.password = '패스워드를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 토큰이 있다면 localStorage에 저장 (또는 쿠키 사용)
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        alert('로그인이 완료되었습니다!');
        router.push('/'); // 홈페이지로 리다이렉트
      } else {
        alert(data.error || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">Wooridle</h1>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base pb-2">아이디</span>
                </label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.userId ? 'input-error' : ''}`}
                  placeholder="아이디를 입력해주세요"
                  disabled={isLoading}
                />
                {errors.userId && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.userId}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base pb-2">패스워드</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  placeholder="패스워드를 입력해주세요"
                  disabled={isLoading}
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>
                )}
              </div>

              <div className="form-control mt-8">
                <button
                  type="submit"
                  className={`btn btn-neutral w-full text-lg ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                </button>
              </div>
            </form>

            <div className="text-center mt-6">
              <span className="text-base-content/70">아이디가 없나요? - </span>
              <Link href="/register" className="link link-primary">
                회원가입 하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}