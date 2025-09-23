import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">Wooridle</h1>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base pb-2">아이디</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder=""
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base pb-2">패스워드</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  placeholder=""
                />
              </div>

              <div className="form-control mt-8">
                <button type="submit" className="btn btn-primary w-full text-lg">
                  로그인
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