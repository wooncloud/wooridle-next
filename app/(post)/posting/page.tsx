'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  title: string;
  content: string;
}

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    } else if (formData.title.length > 200) {
      newErrors.title = '제목은 200자 이하로 입력해주세요.';
    }

    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    } else if (formData.content.length > 10000) {
      newErrors.content = '내용은 10,000자 이하로 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 토큰 확인
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('게시글이 성공적으로 작성되었습니다!');
        router.push('/'); // 홈페이지로 리다이렉트
      } else {
        // 401 에러인 경우 로그인 페이지로 리다이렉트
        if (response.status === 401) {
          alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          alert(data.error || '게시글 작성에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Post creation error:', error);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 w-100">
        <h1 className="text-xl font-bold text-base-content">새 글 쓰기</h1>
      </div>

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div className="form-control">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input input-bordered w-full text-lg ${errors.title ? 'input-error' : ''}`}
            placeholder="제목"
            disabled={isLoading}
          />
          {errors.title && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.title}</span>
            </label>
          )}
          <div className="flex justify-end mt-1">
            <span className={`text-xs ${formData.title.length > 180 ? 'text-warning' : 'text-base-content/50'}`}>
              {formData.title.length}/200
            </span>
          </div>
        </div>

        {/* Content Textarea */}
        <div className="form-control">
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={`textarea textarea-bordered w-full min-h-96 ${errors.content ? 'textarea-error' : ''}`}
            placeholder="무슨 생각을 하고 계신가요..?"
            rows={20}
            disabled={isLoading}
          ></textarea>
          {errors.content && (
            <label className="label">
              <span className="label-text-alt text-error">{errors.content}</span>
            </label>
          )}
          <div className="flex justify-end mt-1">
            <span className={`text-xs ${formData.content.length > 9000 ? 'text-warning' : 'text-base-content/50'}`}>
              {formData.content.length}/10,000
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Link href="/">
            <button type="button" className="btn btn-ghost" disabled={isLoading}>
              취소
            </button>
          </Link>
          <button
            type="submit"
            className={`btn btn-neutral ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? '작성 중...' : '작성'}
          </button>
        </div>
      </form>
    </div>
  );
}