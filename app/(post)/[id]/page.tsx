import Link from 'next/link';
import Comment from '@/components/post/Comment';
import CommentForm from '@/components/post/CommentForm';
import { formatDate } from '@/lib/format';

interface PageProps {
  params: {
    id: string
  },
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
}

interface CommentType {
  id: number;
  content: string;
  authorName: string;
  authorId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

async function getPostData(id: string): Promise<{ post: Post | null; comments: CommentType[] }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    const [postRes, commentsRes] = await Promise.all([
      fetch(`${baseUrl}/api/posts/${id}`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/comments/post/${id}`, { cache: 'no-store' })
    ]);

    const post = postRes.ok ? await postRes.json() : null;
    const comments = commentsRes.ok ? await commentsRes.json() : [];

    return { post, comments };
  } catch (error) {
    console.error('Error fetching post data:', error);
    return { post: null, comments: [] };
  }
}

export default async function PostPage({ params }: PageProps) {
  const { id } = params;
  const { post, comments } = await getPostData(id);

  if (!post) {
    return <div className="p-4">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-4">
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
          <span>By {post.authorName}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.createdAt)}</span>
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
              author={comment.authorName}
              createdAt={formatDate(comment.createdAt)}
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
