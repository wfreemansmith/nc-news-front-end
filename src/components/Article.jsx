import { useState } from "react";
import ArticleCard from "./ArticleCard";
import CommentForm from './CommentForm';
import CommentList from './CommentList'

function Article({user}) {
// const [newComment, setNewComment] = useState({})

  return (
    <div className="single-article">
      <ArticleCard />
      <CommentForm user={user}/>
      <CommentList newComment={newComment}/>
    </div>
  );
}

export default Article;
