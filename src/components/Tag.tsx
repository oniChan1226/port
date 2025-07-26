interface TagProps {
  tag: string;
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  return <div className="bg-primary px-2 py-1 text-xs text-white/95 font-semibold">{tag}</div>;
};

export default Tag;
