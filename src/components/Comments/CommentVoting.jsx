import { useState, useContext } from "react";
import { ThemeContext } from "../../contexts/Theme";
import { patchCommentVote } from "../../utils/api";
import { FaHeart, FaRegHeart }  from "react-icons/fa"

function CommentVoting({ comment }) {
  const { theme } = useContext(ThemeContext);

  const [voteButton, setVoteButton] = useState(0);
  const [voteCount, setVoteCount] = useState(comment.votes);
  const [validation, setValidation] = useState("working");

  const handleVote = (i) => {
    if (voteButton !== i) {
      setVoteButton(i);
      setVoteCount(comment.votes + i);
    } else {
      setVoteButton(0);
      setVoteCount(comment.votes);
      i = -i;
    }

    patchCommentVote(i, comment.comment_id)
      .then(() => {
        setValidation("working");
      })
      .catch(() => {
        setValidation("error");
        setVoteButton(voteButton);
        setVoteCount(voteCount);
      });
  };

  return (
    <p className="comment-item__votes">
      <button
        aria-label="down-voteButton"
        className={
          (voteButton < 0
            ? `comment-list__vote-button button--true`
            : `comment-list__vote-button button--false`) + ` ${theme} ${validation}`
        }
        onClick={() => {
          handleVote(-1);
        }}
      >
        <FaRegHeart size="9" />
      </button>{" "}
      Votes: {voteCount}{" "}
      <button
        aria-label="up-voteButton"
        className={
          (voteButton > 0
            ? `comment-list__vote-button button--true`
            : `comment-list__vote-button button--false`) + ` ${theme} ${validation}`
        }
        onClick={() => {
          handleVote(1);
        }}
      >
        <FaHeart size="9"/>
      </button>
    </p>
  );
}

export default CommentVoting;
