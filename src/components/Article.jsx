import { useState } from "react";
import ArticleCard from "./ArticleCard";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function Article({ user }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="single-article">
      <ArticleCard isLoading={isLoading} setIsLoading={setIsLoading} />
      <CommentForm
        user={user}
        comments={comments}
        setComments={setComments}
        isLoading={isLoading}
      />
      <CommentList
        comments={comments}
        setComments={setComments}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        user={user}
      />
    </div>
  );
}

export default Article;
