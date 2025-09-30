'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/Toast';

interface FormData {
  userId: string;
  password: string;
  confirmPassword: string;
  email: string;
  name: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
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
    } else if (formData.userId.length < 4) {
      newErrors.userId = '아이디는 최소 4자 이상이어야 합니다.';
    }

    if (!formData.password) {
      newErrors.password = '패스워드를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '패스워드는 최소 8자 이상이어야 합니다.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '패스워드 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '패스워드가 일치하지 않습니다.';
    }

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다.';
      }
    }

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          password: formData.password,
          name: formData.name,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast('회원가입이 완료되었습니다!', 'success');
        router.push('/login');
      } else {
        toast(data.error || '회원가입에 실패했습니다.', 'error');
      }
    } catch (error) {
      console.error('Register error:', error);
      toast('네트워크 오류가 발생했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold text-base-content">회원가입</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium text-base-content pb-2">아이디</span>
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
              <span className="label-text text-base font-medium text-base-content pb-2">패스워드</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
              placeholder="패스워드를 입력해 주세요"
              disabled={isLoading}
            />
            {errors.password && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.password}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium text-base-content pb-2">패스워드 확인</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="패스워드를 다시 입력해 주세요"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.confirmPassword}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium text-base-content pb-2">이메일</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              placeholder="이메일을 입력해 주세요"
              disabled={isLoading}
            />
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.email}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium text-base-content pb-2">이름</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              placeholder="이름을 입력해 주세요"
              disabled={isLoading}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name}</span>
              </label>
            )}
          </div>

          <div className="form-control mt-8">
            <button
              type="submit"
              className={`btn btn-neutral w-full text-lg ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? '가입 중...' : '회원가입'}
            </button>
          </div>

        </form>

        <div className="text-center mt-6">
          <Link href="/login" className="link link-primary">
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}