'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import PostList from "@/components/post/PostList";

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

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (isLoading) return;
      
      setIsLoading(true);
      const response = await fetch(`/api/posts?page=${page}&size=50`);
      const data = await response.json();
      const contents = data.content || [];

      setHasMore(contents.length > 0);

      // 중복 제거
      setPosts((prev) => {
        const prevIds = new Set(prev.map((p) => p.id));
        const newPosts = contents.filter((c: Post) => !prevIds.has(c.id));
        return [...prev, ...newPosts];
      });
      setIsLoading(false);
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setPage((prev) => prev + 1);
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <ul className={`${styles.list} list`}>
        {posts.map((post) => (
          <PostList
            key={post.id}
            id={post.id}
            title={post.title}
            username={post.authorName}
            content={post.content}
          />
        ))}
        {hasMore && <div ref={observerRef} style={{ height: '1px' }} />}
      </ul>
    </div>
  );
}
