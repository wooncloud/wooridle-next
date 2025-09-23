import Link from 'next/link';
import Comment from '@/components/post/Comment';
import CommentForm from '@/components/post/CommentForm';

interface PageProps {
  params: {
    id: string
  },
}

export default function PostPage({ params }: PageProps) {
  const { id } = params;

  // 임시 데이터 (실제로는 API에서 가져올 데이터)
  const post = {
    id: parseInt(id),
    title: "Tech Industry Trends",
    author: "Alex Turner",
    timeAgo: "2d ago",
    content: "The tech industry is rapidly evolving, with new technologies emerging constantly. Key trends include the rise of AI and machine learning, the expansion of cloud computing, and the growing importance of cybersecurity. These trends are shaping the future of work and creating new opportunities for innovation and growth.",
    comments: 45,
    shares: 10
  };

  const comments = [
    {
      id: 1,
      author: "Sophia Clark",
      timeAgo: "1d ago",
      content: "Great insights! I'm particularly interested in the implications of AI on job markets.",
    },
    {
      id: 2,
      author: "Ethan Reed",
      timeAgo: "1d ago",
      content: "I agree, Sophia. The shift towards cloud computing is also creating new roles in data management.",
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <Link href="/" className="flex items-center mb-3">
          <span className='mr-4'>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </span>
          <h1 className="text-xl font-bold text-base-content">리스트</h1>
        </Link>

        {/* Post Content */}
        <div className="bg-base-100 rounded-lg p-4 mb-3">
          <h2 className="text-2xl font-bold text-base-content mb-4">{post.title}</h2>

          <div className="flex items-center text-base-content/70 mb-6">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.timeAgo}</span>
          </div>

          <p className="text-base-content leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Comments Section */}
        <div className="bg-base-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-base-content">댓글</h3>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                author={comment.author}
                timeAgo={comment.timeAgo}
                content={comment.content}
              />
            ))}
          </div>

          {/* Add Comment */}
          <div className="mt-8 pt-6 border-t border-base-300">
            <CommentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
