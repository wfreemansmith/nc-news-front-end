import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
import { patchVote } from "../utils/api";
import { FaHeart, FaRegHeart } from "react-icons/fa"

function ArticleVoting({ article }) {
  const { theme } = useContext(ThemeContext);

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
  }, [like, votes]);

  const incrementVote = () => {
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
        className={`${
          like ? `article__like-button button--true` : `article__like-button button--false`
        } ${theme} ${validation}`}
        aria-label="like"
        onClick={() => {
          incrementVote();
        }}
      >
        {like ? <FaHeart size="12"/> : <FaRegHeart size="12"/>}
      </button>
    </section>
  );
}

export default ArticleVoting;
