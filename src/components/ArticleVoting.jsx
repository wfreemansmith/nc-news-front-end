import { useState, useEffect } from "react";
import { patchVote } from "../utils/api";

function ArticleVoting({ article }) {
  const [like, setLike] = useState(false);
  const [voteString, setVoteString] = useState(``);
  const [validation, setValidation] = useState("working");
  const votes = article.votes;

  useEffect(() => {
    setVoteString(
      (like ? `You and ${votes} other` : votes ? votes : `No`) +
        (votes === 1 ? ` person likes` : ` people like`) +
        ` this article`
    );
  }, [like]);

  function incrementVote() {
    const i = like ? -1 : 1;
    like ? setLike(false) : setLike(true);
    patchVote(i, article.article_id)
    .then(() => {
        setValidation("working");
      })
      .catch(() => {
        setValidation("error");
        !like ? setLike(false) : setLike(true);
      });
  }

  return (
    <section className="article-votes">
      <h3>{voteString}</h3>
      <button
        className={`${validation} ${
          like ? `article__like-button--true` : `article__like-button--false`
        }`}
        aria-label="like"
        onClick={() => {
          incrementVote();
        }}
      >
        {like ? "♥" : "♡"}
      </button>
    </section>
  );
}

export default ArticleVoting;
