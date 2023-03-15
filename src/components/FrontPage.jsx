import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../utils/api";
import { Link } from "react-router-dom";

function FrontPage({ topicList, setDescription }) {
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);
  
  useEffect(() => {
    setIsLoading(true);
    getArticles(topic).then(({ articles }) => {
      setIsLoading(false);
      setArticleList(articles);
      setDescription(
        topic ? topicList.find((item) => item.slug === topic).description : ""
      );
    });
  }, [topic]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <p>Sorted by date in descending order</p>
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
              <p>author:{article.author}</p>
              {topic !== article.topic ? (
                <p>
                  category:
                  <Link to={`/${article.topic}`} className="topic-link">
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
