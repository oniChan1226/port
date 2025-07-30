import { Link } from "react-router-dom";
import type { IArticlePost } from "../interfaces/Article";
import { formatter } from "../lib/helpers";

interface Props {
  article: IArticlePost;
}

const ArticlesCard = ({ article }: Props) => {
  return (
    <Link
      to={`/articles/${article?.id}`}
      className="rounded-xl overflow-hidden border border-neutral-800 flex flex-col cursor-pointer group hover:shadow-xl duration-300"
    >
      <img
        src={
          article?.cover_image ||
          "https://www.cleverdeveloper.in/_next/image?url=%2Fimages%2Fcontent%2Fbest-coding-practices%2Fbest-coding-practices.webp&w=1920&q=75"
        }
        alt=""
        className="object-cover h-64 md:h-96 lg:h-64 lg:group-hover:scale-105 duration-300"
      />
      <div className="flex space-x-6 justify-between px-5 py-4 bg-primary ">
        <div className="flex flex-col items-start space-y-1">
          <h2 className="line-clamp-1 text-white font-semibold">
            {article?.title}
          </h2>
          <p className="text-xs text-neutral-400/80">
            {formatter.format(new Date(article?.created_at))}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className=" border border-neutral-800 rounded-lg px-2 py-1 h-fit text-xs font-semibold capitalize">
            {article?.tag_list[0] || "Coding"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticlesCard;
