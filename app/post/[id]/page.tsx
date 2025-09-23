// app/blog/[id]/page.tsx
interface PageProps {
  params: {
    id: string
  },
}

// http://localhost:3000/blog/3?title=hello

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <p>Post ID: {id}</p>
    </div>
  )
}
