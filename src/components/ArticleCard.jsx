import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, getUserByUsername } from "../utils/api";
import ArticleVoting from "./ArticleVoting";

function ArticleCard({isLoading, setIsLoading}) {
  const [article, setArticle] = useState([]);
  const [author, setAuthor] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        return getUserByUsername(article.author);
      })
      .then(({ user }) => {
        setAuthor(user);
        setIsLoading(false);
      });
  }, [article_id]);


  if (isLoading) return <p>Loading article...</p>;

  return (
    <>
      <article className="article-card">
        <img
          className="article-card__img"
          src={article.article_img_url}
          alt={article.title}
        ></img>
        <h2>{article.title}</h2>
        <div className="article-card__author">
          <img
            className="article-card__author-avatar"
            src={author.avatar_url}
            alt={`Avatar for author ${article.author}`}
          ></img>
          <p className="article-card__author-name">
            By {article.author}
          </p>
          <p className="article-card__topic">
            in <Link to={`/${article.topic}`} className="topic-link">{article.topic}</Link>
          </p>
        </div>
        <p>{article.body}</p>
      </article>
      <ArticleVoting article={article}/>
    </>
  );
}

export default ArticleCard;
