export default function Avatar(props: { imageUrl: string }) {
    const { imageUrl } = props;

  return (
    <div className="avatar">
      <div className="w-24 rounded-full">
        <img src={imageUrl} />
      </div>
    </div>
  );
}
