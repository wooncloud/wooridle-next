import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold text-base-content">회원가입</h1>
        </div>

        <div className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium text-base-content pb-2">아이디</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="아이디를 입력해주세요"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium text-base-content pb-2">패스워드</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="패스워드를 입력해 주세요."
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium text-base-content pb-2">패스워드 확인</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="패스워드를 입력해 주세요."
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium text-base-content pb-2">이메일</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="이메일을 입력해 주세요."
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base font-medium text-base-content pb-2">이름</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="이름을 입력해 주세요."
            />
          </div>

          <div className="form-control mt-8">
            <button type="submit" className="btn btn-primary w-full text-lg">
              회원가입
            </button>
          </div>

          <div className="text-center mt-6">
            <Link href="/login" className="link link-primary">
              로그인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}