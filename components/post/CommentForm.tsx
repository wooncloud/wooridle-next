export default function CommentForm() {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center text-lg">
        👤
      </div>
      <div className="flex-1">
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="댓글 작성하기..."
          rows={3}
        ></textarea>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2"></div>
          <button className="btn btn-neutral btn-sm">
            작성
          </button>
        </div>
      </div>
    </div>
  );
}