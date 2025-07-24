import ArticlesCard from "../components/ArticlesCard"
import PageTitle from "../components/PageTitle"
import { myArticles } from "../data/ArticlesData"

const Articles = () => {
  return (
    <div>
      <PageTitle title="Articles" brief="Documenting what I learn, build, and think about as a dev." />
      <div className="grid lg:grid-cols-2 gap-6 mt-12">
        {myArticles.map((article) => (
          <ArticlesCard key={article.timestamps} imgSrc={article.imgSrc} title={article.title} timestamp={article.timestamps} tag={article.tag} />
        ))}
      </div>
    </div>
  )
}

export default Articles