import { getArticles, getUserByUsername } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function User() {
  const { username } = useParams();
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
      }).catch((err) => {
        setErrCode(err.response.status)
        setErrMsg(err.response.data.msg)
      })
  }, [username]);

  if (errCode) navigate("/error", { state: { errCode, errMsg } });
  if (isLoading) return <p>Loading user profile...</p>;

  return (
    <>
      <div className="user-profile">
        <section className="user-profile__user-info">
        <img src={author.avatar_url} alt={author.name} className="user-profile__profile-pic"></img>
        <h3 className="user-details">{author.name}</h3>
        <p className="user-details">{author.username}</p>
      </section>
      <section>
        <ul className="user-profile__article-list">
          {articleList.map((article) => {
            return (
              <li className="article-list-item small-item" key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <img
                    className="article-list__img link--no-padding"
                    src={article.article_img_url}
                    alt={`Image for the article ${article.title}`}
                  ></img>
                  <h3>{article.title}</h3>
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
      </section>
          </div>
    </>
  );
}

export default User;
