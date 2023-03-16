import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getArticleById, getUserByUsername } from "../utils/api";
import ArticleVoting from "./ArticleVoting";

function ArticleCard({isLoading, setIsLoading}) {
  const [article, setArticle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [errCode, setErrCode] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const { article_id } = useParams();

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
  }, [article_id]);

  if (errCode) navigate("/error", { state: { errCode, errMsg } });
  if (isLoading) return <p>Loading article...</p>;

  return (
    <>
      <section>
      <Link to={`/users/${article.author}`}><img
          className="article-card__img"
          src={article.article_img_url}
          alt={article.title}
        ></img></Link>
        <h2 className="article-card__title">{article.title}</h2>
        </section>
        <body  className="article-card">
        <div className="article-card__author">
          <img
            className="article-card__author-avatar"
            src={author.avatar_url}
            alt={`Avatar for author ${article.author}`}
          ></img>
          <p className="article-card__author-name">
            By <Link to={`/users/${article.author}`} className="user-link">{article.author}</Link>
          </p>
          <p className="article-card__topic">
            in <Link to={`/topics/${article.topic}`} className="topic-link">{article.topic}</Link>
          </p>
        </div>
        <p>{article.body}</p>
        </body>
      
      <ArticleVoting article={article}/>
    </>
  );
}

export default ArticleCard;
