import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, replace, useNavigate, useParams } from "react-router-dom";
import { fetchBlog } from "../api/fetchBlogs";
import ReactMarkdown from "react-markdown";
import type { IArticle } from "../interfaces/Article";
import SomethingWentWrong from "./SomethingWentWrong";
import { formatter } from "../lib/helpers";
import { Dot } from "lucide-react";
import JoinReader from "../components/JoinReader";

const ArticleDetails = () => {
  const id = useParams().id;

  const articleId = Number(id);
  if (isNaN(articleId)) {
    return <SomethingWentWrong />;
  }

  const { data, isLoading, error } = useQuery<IArticle>({
    queryKey: ["devBlog", articleId],
    queryFn: () => fetchBlog(articleId),
    enabled: !isNaN(articleId),
  });

  console.log(data);
  return (
    <div className="space-y-8">
      <Link
        to={"/articles"}
        className="flex items-center space-x-1 text-neutral-500 duration-300 hover:text-white/90 hover:pl-1"
      >
        <span className="text-sm">{"<--"}</span>
        <span className="font-semibold">All Articles</span>
      </Link>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <article className=" porse-neutral space-y-5 hyphens-auto">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-wide text-white">
            {data?.title}
          </h2>
          <p className="text-neutral-400/90">{data?.description}</p>
          <div className="text-neutral-400/90 flex items-center text-sm">
            <span>{formatter.format(new Date(data?.created_at))}</span>
            <Dot />
            <span className="whitespace-normal capitalize">
              {data?.tags[0] || "Coding"}
            </span>
            <Dot />
            <span>{data?.reading_time_minutes} min read</span>
          </div>
          <div className="w-full h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-xl">
            <img
              src={
                data?.cover_image ||
                "https://www.cleverdeveloper.in/_next/image?url=%2Fimages%2Fcontent%2Fbest-coding-practices%2Fbest-coding-practices.webp&w=1920&q=75"
              }
              alt="cover_image"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div
            className="prose prose-invert max-w-none 
          prose-headings:text-white
  prose-p:text-neutral-300"
          >
            <ReactMarkdown>{data?.body_markdown}</ReactMarkdown>
          </div>
        </article>
      )}
      <JoinReader />
    </div>
  );
};

export default ArticleDetails;
