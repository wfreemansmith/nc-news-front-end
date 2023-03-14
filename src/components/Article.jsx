import { useState } from "react";
import ArticleCard from "./ArticleCard";
import CommentForm from './CommentForm';
import CommentList from './CommentList'

function Article({user}) {

  return (
    <div className="single-article">
      <ArticleCard />
      <CommentForm user={user}/>
      <CommentList/>
    </div>
  );
}

export default Article;
