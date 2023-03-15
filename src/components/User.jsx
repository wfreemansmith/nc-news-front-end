import { getArticles, getUserByUsername } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function User() {
  const { username } = useParams();
  const [author, setAuthor] = useState({});
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(username)
      .then(({ user }) => {
        console.log(user);
        setAuthor(user);
        return getArticles(null, null, null, user.username);
      })
      .then(({ articles }) => {
        console.log(articles)
        setArticleList(articles);
        setIsLoading(false);
      })
  }, [username]);

  if (isLoading) return;

  return (
    <>
      <div>
        <img src={author.avatar_url} alt={author.name}></img>
        <h3>{author.name}</h3>
        <p>{author.username}</p>
      </div>
      <div>
        <ul className="article-list">
          {articleList.map((article) => {
            return (
              <li className="article-list-item" key={article.article_id}>
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
                  <Link to={`/${article.topic}`} className="topic-link">
                    {article.topic}
                  </Link>
                </p>

                <p>{article.body.substring(0, 200).trim() + `...`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default User;
