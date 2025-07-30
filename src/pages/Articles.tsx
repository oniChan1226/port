import { useQuery } from "@tanstack/react-query";
import ArticlesCard from "../components/ArticlesCard";
import PageTitle from "../components/PageTitle";
import { fetchBlogs } from "../api/fetchBlogs";
import type { ArticleList } from "../interfaces/Article";

const Articles = () => {
  const { data, isLoading, error } = useQuery<ArticleList>({
    queryKey: ["devBlog"],
    queryFn: fetchBlogs,
  });
  if (error) {
    console.log(error);
    return null;
  }
  return (
    <div>
      <PageTitle
        title="Articles"
        brief="Documenting what I learn, build, and think about as a dev."
      />
      <div className="grid lg:grid-cols-2 gap-6 mt-12">
        {isLoading || !data ? (
          <div className="text-neutral-400 animate-pulse">Loading...</div>
        ) : (
          data?.map((article) => (
            <ArticlesCard
              key={article?.id}
              article={article}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Articles;
