import { useState } from "react";
import { patchVote } from "../utils/api";

function ArticleVoting({ article }) {
  const [like, setLike] = useState(false);
  const [validation, setValidation] = useState("working");
  const votes = article.votes

  function incrementVote() {
    const i = like ? -1 : 1;
    patchVote(i, article.article_id).then(() => {
      like ? setLike(false) : setLike(true);  
      setValidation("working")
    }).catch(() => {
      setValidation("error")

    })
    
  }

  let voteString = ``;

  voteString += like
    ? `You and ${votes} other`
    : (voteString += votes ? votes : `No`);
  voteString += ` people like this article`;

  return (
    <section className="article-votes">
      <p>{voteString}</p>
      <button
      className={`${validation} ${like ? `article__like-button--true` : `article__like-button--false`}`}
        aria-label="like"
        onClick={() => {
          incrementVote();
        }}
      >
        {like ? "♥": "♡"}
      </button>
    </section>
  );
}

export default ArticleVoting;
