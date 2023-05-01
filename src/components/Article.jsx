import { useState } from "react";
import ArticleCard from "./ArticleCard";
import CommentForm from "./Comments/CommentForm";
import CommentList from "./Comments/CommentList";

function Article({ setPopUp }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="single-article">
      <ArticleCard isLoading={isLoading} setIsLoading={setIsLoading} />
      <CommentForm
        comments={comments}
        setComments={setComments}
        articleLoading={isLoading}
        setPopUp={setPopUp}
      />
      <CommentList
        articleLoading={isLoading}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}

export default Article;
