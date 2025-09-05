export default function PostList(props: {
  id: number;
  title: string;
  content: string;
}) {
  const { id, title, content } = props;

  // http://localhost:3000/blog/3
  return (
    <li className="list-row" key={id}>
      <a href={`http://localhost:3000/blog/${id}`}>
        <div>
          <div>{title}</div>
        </div>
        <p className="list-col-wrap">{content}</p>
      </a>
    </li>
  );
}
