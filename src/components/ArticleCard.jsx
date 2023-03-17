import ArticleVoting from "./ArticleVoting";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getArticleById, getUserByUsername } from "../utils/api";

function ArticleCard({isLoading, setIsLoading}) {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [errCode, setErrCode] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();

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
      }).catch((err) => {
        setErrCode(err.response.status)
        setErrMsg(err.response.data.msg)
      });
  }, [article_id, setIsLoading]);

  if (errCode) navigate("/error", { state: { errCode, errMsg } });
  if (isLoading) return <p>Loading article...</p>;

  return (
    <>
      <section>
      <img
          className="article-card__img"
          src={article.article_img_url}
          alt={article.title}
        ></img>
        <h2 className="article-card__title">{article.title}</h2>
        </section>
        <article  className="article-card">
        <div className="article-card__author">
        <Link to={`/users/${article.author}`}><img
            className="article-card__author-avatar"
            src={author.avatar_url}
            alt={`Avatar for author ${article.author}`}
          ></img></Link>
          <p className="user-details">
            <Link to={`/users/${article.author}`} className="topic-link">{article.author}</Link>
          </p>
          <p className="user-details">
            <Link to={`/topics/${article.topic}`} className="topic-link">{article.topic}</Link>
          </p>
        </div>
        <p>{article.body}</p>
        </article>
      
      <ArticleVoting article={article}/>
    </>
  );
}

export default ArticleCard;
