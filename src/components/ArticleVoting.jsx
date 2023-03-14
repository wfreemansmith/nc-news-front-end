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
    patchVote(i, article.article_id)
      .then(() => {
        like ? setLike(false) : setLike(true);
        setValidation("working");
      })
      .catch(() => {
        setValidation("error");
      });
  }

  console.log(like);

  // voteString += like
  //   ? `You and ${votes} other`
  //   : (voteString += votes ? votes : `No`);
  // voteString += ` people like this article`;

  return (
    <section className="article-votes">
      <p>{voteString}</p>
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
