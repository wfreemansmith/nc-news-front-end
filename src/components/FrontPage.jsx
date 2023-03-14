import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "../utils/api";
import { Link } from 'react-router-dom';

function FrontPage() {
  const {topic} = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic).then(({ articles }) => {
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
              <Link to={`/articles/${article.article_id}`}>
                <img
                  className="article-list__img"
                  src={article.article_img_url}
                  alt={`Image for the article ${article.title}`}
                ></img>
                <h3>{article.title}</h3>
                </Link>  
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
