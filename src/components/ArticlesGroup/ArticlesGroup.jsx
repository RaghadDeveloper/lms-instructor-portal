import "./ArticlesGroup.css";
import ArticleCard from "../ArticleCard/ArticleCard";

function ArticlesGroup() {
  return (
    <div className="articles-group">
      <h2>My Articles</h2>
      <div>
        <ArticleCard />
      </div>
    </div>
  );
}

export default ArticlesGroup;
