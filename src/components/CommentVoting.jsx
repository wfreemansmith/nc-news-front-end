import { useState } from "react";
import { patchCommentVote } from "../utils/api";

function CommentVoting({ comment }) {
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
            ? `comment-list__vote-button--true`
            : `comment-list__vote-button--false`) + ` ${validation}`
        }
        onClick={() => {
          handleVote(-1);
        }}
      >
        ♡
      </button>{" "}
      Votes: {voteCount}{" "}
      <button
        aria-label="up-voteButton"
        className={
          (voteButton > 0
            ? `comment-list__vote-button--true`
            : `comment-list__vote-button--false`) + ` ${validation}`
        }
        onClick={() => {
          handleVote(1);
        }}
      >
        ♥
      </button>
    </p>
  );
}

export default CommentVoting;
