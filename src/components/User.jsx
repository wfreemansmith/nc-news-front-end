import { getArticles, getUserByUsername } from "../utils/api";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { slide, fade } from "../assets/transitions";
import { ThemeContext } from "../contexts/Theme";

function User() {
  const { username } = useParams();
  const { theme } = useContext(ThemeContext);

  const [author, setAuthor] = useState({});
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errCode, setErrCode] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(username)
      .then(({ user }) => {
        setAuthor(user);
        return getArticles(null, null, null, user.username);
      })
      .then(({ articles }) => {
        setArticleList(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrCode(err.response.status);
        setErrMsg(err.response.data.msg);
      });
  }, [username]);

  if (errCode) navigate("/error", { state: { errCode, errMsg } });
  if (isLoading) return <p>Loading user profile...</p>;

  return (
    <div className="user-profile">
      <m.section
        initial={fade.initial}
        animate={fade.animate}
        transition={fade.transition}
        className="user-profile__user-info"
      >
        <img
          src={author.avatar_url}
          alt={author.name}
          className="user-profile__profile-pic"
        ></img>
        <h3 className="user-details">{author.name}</h3>
        <p className="user-details">{author.username}</p>
      </m.section>
      <m.section
        initial={slide.initial}
        animate={slide.animate}
        exit={slide.exit}
        transition={slide.transition}
        >
        <h3>Published articles:</h3>
        <ul className="user-profile__article-list">
          {articleList.map((article) => {
            return (
              <li
                className="article-list-item small-item"
                key={article.article_id}
              >
                <Link to={`/articles/${article.article_id}`}>
                  <img
                    className="article-list__img link--no-padding"
                    src={article.article_img_url}
                    alt={`${article.title}`}
                  ></img>
                  <h3 className={theme}>{article.title}</h3>
                </Link>
                <p>
                  category:
                  <Link to={`/topics/${article.topic}`} className="topic-link">
                    {article.topic}
                  </Link>
                </p>

                <p>{article.body.substring(0, 200).trim() + `...`}</p>
              </li>
            );
          })}
        </ul>
      </m.section>
    </div>
  );
}

export default User;
