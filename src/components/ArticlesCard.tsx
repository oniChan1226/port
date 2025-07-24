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
    <div className="rounded-xl overflow-hidden border border-neutral-800 flex flex-col cursor-pointer group hover:shadow-xl duration-300">
      <img
        src={
          "https://www.cleverdeveloper.in/_next/image?url=%2Fimages%2Fcontent%2Fbest-coding-practices%2Fbest-coding-practices.webp&w=1920&q=75"
        }
        alt=""
        className="object-cover lg:max-h-64 lg:group-hover:scale-105 duration-300"
      />
      <div className="flex space-x-6 justify-between px-5 py-4 bg-primary ">
        <div className="flex flex-col items-start space-y-1">
          <h2 className="line-clamp-1 text-white font-semibold">{title}</h2>
          <p className="text-xs text-neutral-400/80">{timestamp}</p>
        </div>
        <div className="flex justify-center items-center">
          <p className=" border border-neutral-800 rounded-lg px-2 py-1 h-fit text-xs font-semibold">
            {tag}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticlesCard;
