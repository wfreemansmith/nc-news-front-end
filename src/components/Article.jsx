import ArticleCard from "./ArticleCard";
import CommentForm from './CommentForm';
import CommentList from './CommentList'

function Article() {
  return (
    <div className="single-article">
      <ArticleCard />
      <CommentForm/>
      <CommentList />
    </div>
  );
}

export default Article;
