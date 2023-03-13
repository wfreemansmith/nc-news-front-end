import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";

function FrontPage({ topic }) {
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic).then(({ articles }) => {
      console.log(articles);
      setIsLoading(false);
      setArticleList(articles);
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
              <img
                className="article-list__img"
                src={article.article_img_url}
                alt={`Image for the article ${article.title}`}
              ></img>
              <h2>{article.title}</h2>
              <p>
                <em>author:</em> {article.author} <em> | category:</em>{" "}
                {article.topic}
              </p>
              <p>{article.body.substring(0,200).trim() + `...`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FrontPage;
