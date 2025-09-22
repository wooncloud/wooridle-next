import './page.css';
import PostList from "@/components/PostList";

export default function Home() {
  const posts = [
    { 
      id: 1, 
      title: "첫 번째 포스트", 
      content: "이것은 첫 번째 포스트입니다.",
      username: "woon", 
    },
    { 
      id: 2, 
      title: "두 번째 포스트", 
      content: "이것은 두 번째 포스트입니다.",
      username: "woon", 
    },
    { 
      id: 3, 
      title: "세 번째 포스트", 
      content: "이것은 세 번째 포스트입니다.",
      username: "woon", 
    },
    { 
      id: 4, 
      title: "네 번째 포스트", 
      content: "이것은 네 번째 포스트입니다.",
      username: "woon", 
    },
    {
      id: 5,
      title: "다섯 번째 포스트",
      content: "이것은 다섯 번째 포스트입니다.",
      username: "woon",
    },
  ];

  return (
    <div className="w-100">
      <ul className="list">
        {posts.map((post) => (
          <PostList
            key={post.id}
            id={post.id}
            title={post.title}
            username={post.username}
            content={post.content}
          />
        ))}
      </ul>
    </div>
  );
}
