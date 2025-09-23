import styles from './page.module.css';
import PostList from "@/components/post/PostList";

export default function Home() {
  const posts = [
    { id: 1, title: "첫 번째 포스트", content: "이것은 첫 번째 포스트입니다.",username: "woon", },
    { id: 2, title: "두 번째 포스트", content: "이것은 두 번째 포스트입니다.",username: "woon", },
    { id: 3, title: "세 번째 포스트", content: "이것은 세 번째 포스트입니다.",username: "woon", },
    { id: 4, title: "네 번째 포스트", content: "이것은 네 번째 포스트입니다.",username: "woon", },
    { id: 5, title: "다섯 번째 포스트",content: "이것은 다섯 번째 포스트입니다.",username: "woon",},
    { id: 6, title: "첫 번째 포스트", content: "이것은 첫 번째 포스트입니다.",username: "woon", },
    { id: 7, title: "두 번째 포스트", content: "이것은 두 번째 포스트입니다.",username: "woon", },
    { id: 8, title: "세 번째 포스트", content: "이것은 세 번째 포스트입니다.",username: "woon", },
    { id: 9, title: "네 번째 포스트", content: "이것은 네 번째 포스트입니다.",username: "woon", },
    { id: 10, title: "다섯 번째 포스트",content: "이것은 다섯 번째 포스트입니다.",username: "woon",},
    { id: 11, title: "첫 번째 포스트", content: "이것은 첫 번째 포스트입니다.",username: "woon", },
    { id: 12, title: "두 번째 포스트", content: "이것은 두 번째 포스트입니다.",username: "woon", },
    { id: 13, title: "세 번째 포스트", content: "이것은 세 번째 포스트입니다.",username: "woon", },
    { id: 14, title: "네 번째 포스트", content: "이것은 네 번째 포스트입니다.",username: "woon", },
    { id: 15, title: "다섯 번째 포스트",content: "이것은 다섯 번째 포스트입니다.",username: "woon",},
    { id: 16, title: "첫 번째 포스트", content: "이것은 첫 번째 포스트입니다.",username: "woon", },
    { id: 17, title: "두 번째 포스트", content: "이것은 두 번째 포스트입니다.",username: "woon", },
    { id: 18, title: "세 번째 포스트", content: "이것은 세 번째 포스트입니다.",username: "woon", },
    { id: 19, title: "네 번째 포스트", content: "이것은 네 번째 포스트입니다.",username: "woon", },
    { id: 20, title: "다섯 번째 포스트",content: "이것은 다섯 번째 포스트입니다.",username: "woon",},
  ];

  return (
    <div className={styles.container}>
      <ul className={`${styles.list} list`}>
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
