import Link from 'next/link';

export default function NewPostPage() {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 w-100">
        <h1 className="text-xl font-bold text-base-content">새 글 쓰기</h1>
      </div>

      {/* Post Form */}
      <div className="space-y-4">
        {/* Title Input */}
        <div className="form-control">
          <input
            type="text"
            className="input input-bordered w-full text-lg"
            placeholder="제목"
          />
        </div>

        {/* Content Textarea */}
        <div className="form-control">
          <textarea
            className="textarea textarea-bordered w-full min-h-96"
            placeholder="무슨 생각을 하고 계신가요..?"
            rows={20}
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Link href="/">
            <button className="btn btn-ghost">취소</button>
          </Link>
          <button className="btn btn-neutral">작성</button>
        </div>
      </div>
    </div>
  );
}