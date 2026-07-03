interface TagProps {
  tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return (
    <div
      className="bg-neutral-800 px-2 py-1 text-xs font-semibold rounded-sm"
      style={{ color: "var(--text-base)" }}
    >
      {tag}
    </div>
  );
};

export default Tag;
