import Link from "next/link";

export default function PostList(props: {
  id: number;
  title: string;
  content: string;
  username: string;
}) {
  const { id, title, content, username } = props;

  return (
    <Link href={`/${id}`}>
      <li className="list-row">
        <div>
          <div>{title}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {username}
          </div>
        </div>
        <p className="list-col-wrap text-xs overflow-hidden whitespace-nowrap text-ellipsis">
          {content}
        </p>
      </li>
    </Link>
  );
}
