import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../utils/api";
import { Link } from "react-router-dom";

function FrontPage({ topicList, setDescription }) {
  const { topic } = useParams();
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errCode, setErrCode] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();
  
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, searchParams.get("sort_by"), searchParams.get("order"))
      .then(({ articles }) => {
        setIsLoading(false);
        setArticleList(articles);
        setDescription(
          topic && topicList.length
            ? topicList.find((item) => item.slug === topic).description
            : ""
        );
      })
      .catch((err) => {
        setErrCode(err.response.status);
        setErrMsg(err.response.data.msg);
        // setIsLoading(false);
      });
  }, [topic, searchParams]);

  if (errCode) navigate("/error", { state: { errCode, errMsg } });
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <section className="query-bar">
        Sorted by{" "}
        <select
          value={sort_by || ""}
          onChange={(event) => {
            setSearchParams({
              sort_by: event.target.value,
              order: sort_by === "created_at" ? "desc" : "asc",
            });
          }}
        >
          <option value="created_at">date</option>
          <option value="title">title</option>
          <option value="topic">topic</option>
          <option value="author">author</option>
        </select>{" "}
        in{" "}
        <select
          value={order || ""}
          onChange={(event) => {
            setSearchParams({
              sort_by: sort_by || "created_at",
              order: event.target.value,
            });
          }}
        >
          <option value="desc">descending</option>
          <option value="asc">ascending</option>
        </select>{" "}
        order
      </section>

      <ul className="article-list">
        {articleList.map((article) => {
          return (
            <li className="small-item" key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                <img
                  className="article-list__img link--no-padding"
                  src={article.article_img_url}
                  alt={`Image for the article ${article.title}`}
                ></img>
                <h3>{article.title}</h3>
              </Link>

              <p>
                author:
                <Link to={`/users/${article.author}`} className="user-link">
                  {article.author}
                </Link>
              </p>
              {topic !== article.topic ? (
                <p>
                  category:
                  <Link to={`/topics/${article.topic}`} className="topic-link">
                    {article.topic}
                  </Link>
                </p>
              ) : (
                <p></p>
              )}
              <p>{article.body.substring(0, 200).trim() + `...`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FrontPage;
