import { useState } from "react";
import { deleteComment } from "../utils/api";

function CommentDelete({ thisComment, comments, setComments }) {
  const [deleting, setDeleting] = useState("working");

  function handleDelete(comment_id) {
    setDeleting("in-progress");
    deleteComment(comment_id)
      .then(() => {
        setComments(comments.filter((comment) => comment !== thisComment));
      })
      .catch(() => {
        setDeleting("error");
      });
  }

  return (
    <button
      className={deleting}
      onClick={() => {
        handleDelete(thisComment.comment_id);
      }}
    >
      {deleting === "in-progress" ? "Deleting..." : "Delete"}
    </button>
  );
}

export default CommentDelete;
