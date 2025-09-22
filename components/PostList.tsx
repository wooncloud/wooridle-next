export default function PostList(props: {
  id: number;
  title: string;
  content: string;
  username: string;
}) {
  const { id, title, content, username } = props;

  // http://localhost:3000/blog/3
  return (
    <li className="list-row">
    <div>
      <div>{title}</div>
      <div className="text-xs uppercase font-semibold opacity-60">
        {username}
      </div>
    </div>
    <p className="list-col-wrap text-xs">
      {content}
    </p>
  </li>
  );
}
