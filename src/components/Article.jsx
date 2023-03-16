import { useState } from "react";
import ArticleCard from "./ArticleCard";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function Article({ user, setErrCode, setErrMsg }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="single-article">
      <ArticleCard
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setErrCode={setErrCode}
        setErrMsg={setErrMsg}
      />
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
