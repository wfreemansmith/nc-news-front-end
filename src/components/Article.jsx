import { useState } from "react";
import ArticleCard from "./ArticleCard";
import CommentForm from './CommentForm';
import CommentList from './CommentList'

function Article({user}) {
  const [comments, setComments] = useState([]);

  return (
    <div className="single-article">
      <ArticleCard />
      <CommentForm user={user} comments={comments}setComments={setComments}/>
      <CommentList comments={comments} setComments={setComments}/>
    </div>
  );
}

export default Article;
