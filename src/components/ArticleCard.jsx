import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion as m, AnimatePresence } from "framer-motion";
import { slide } from "../assets/transitions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getArticleById, getUserByUsername } from "../utils/api";
import ArticleVoting from "./ArticleVoting";
import Spinner from "./Spinner";
import placeholder from "../assets/faf9fa.png";
import ScrollToTop from "./ScrollToTop";

function ArticleCard({ isLoading, setIsLoading }) {
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
      })
      .catch((err) => {
        setErrCode(err.response.status);
        setErrMsg(err.response.data.msg);
      });
  }, [article_id, setIsLoading]);

  // useEffect(() => {
  //   const top = document.getElementById("top");
  //   top.scrollIntoView({ behavior: "smooth", block: "start" });
  // }, [isLoading]);

  if (errCode) navigate("/error", { state: { errCode, errMsg } });
  if (isLoading) return <Spinner />;

  return (
    <AnimatePresence>
      <ScrollToTop/>
      <m.div
        initial={slide.initial}
        animate={slide.animate}
        exit={slide.exit}
        transition={slide.transition}
        className="article-card"
        key="article"
      >
        <section id="top">
          <LazyLoadImage
            className="article-card__img img"
            src={article.article_img_url}
            alt={article.title}
            placeholderSrc={placeholder}
          />
          <h2 className="article-card__title">{article.title}</h2>
        </section>
        <article className="article-card__article">
          <div className="article-card__author">
            <Link to={`/users/${article.author}`}>
              <img
                className="article-card__author-avatar img"
                src={author.avatar_url}
                alt={`Avatar for author ${article.author}`}
              ></img>
            </Link>
            <p className="user-details">
              <Link to={`/users/${article.author}`} className="topic-link">
                {article.author}
              </Link>
            </p>
            <p className="user-details">
              <Link to={`/topics/${article.topic}`} className="topic-link">
                {article.topic}
              </Link>
            </p>
          </div>
          <p>{article.body}</p>
        </article>

        <ArticleVoting article={article} />
      </m.div>
    </AnimatePresence>
  );
}

export default ArticleCard;
