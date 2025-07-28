
interface FeedViewProps {
    timestamp: string;
    title: string;
    description: string;
};

const FeedView: React.FC<FeedViewProps> = ({ timestamp, title, description }) => {
  return (
    <div className="border-t border-neutral-800 grid space-y-1 lg:space-y-0 lg:grid-cols-2 justify-between items-start py-6">
        <div className="text-sm text-neutral-400/80">
            <p>{timestamp}</p>
        </div>
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-neutral-500">{description}</p>
        </div>
    </div>
  )
}

export default FeedView