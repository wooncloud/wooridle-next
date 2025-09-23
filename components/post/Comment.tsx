interface CommentProps {
  id: number;
  author: string;
  timeAgo: string;
  content: string;
}

export default function Comment({
  id,
  author,
  timeAgo,
  content,
}: CommentProps) {
  return (
    <div>
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center text-lg">
          {/* {avatar} */}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold text-base-content">{author}</span>
            <span className="text-base-content/70 text-sm">{timeAgo}</span>
          </div>
          <p className="text-base-content">{content}</p>
        </div>
      </div>
    </div>
  );
}