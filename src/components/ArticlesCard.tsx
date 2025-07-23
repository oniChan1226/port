import type React from "react";

interface ArticlesCardProps {
  imgSrc: string;
  title: string;
  timestamp: string;
  tag: string;
}

const ArticlesCard: React.FC<ArticlesCardProps> = ({
  imgSrc,
  title,
  timestamp,
  tag,
}) => {
  return (
    <div>
      <img src={imgSrc} alt="" />
      <div>
        <div>
          <h2>{title}</h2>
          <p>{timestamp}</p>
        </div>
        <h6>{tag}</h6>
      </div>
    </div>
  );
};

export default ArticlesCard;
