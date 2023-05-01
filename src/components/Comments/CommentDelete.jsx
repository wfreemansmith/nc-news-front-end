import { useState, useContext } from "react";
import { deleteComment } from "../../utils/api";
import { ThemeContext } from "../../contexts/Theme";

function CommentDelete({ thisComment, comments, setComments }) {
  const { theme } = useContext(ThemeContext);

  const [deleting, setDeleting] = useState("working");

  const handleDelete = (comment_id) => {
    setDeleting("in-progress");
    deleteComment(comment_id)
      .then(() => {
        console.log(thisComment)
        setComments(comments.filter((comment) => comment !== thisComment));
        console.log("filtered comments")
      })
      .catch(() => {
        setDeleting("error");
      });
  };

  return (
    <button
      className={`delete ${deleting} ${theme}`}
      onClick={() => {
        handleDelete(thisComment.comment_id);
      }}
    >
      {deleting === "in-progress" ? "Deleting..." : "Delete"}
    </button>
  );
}

export default CommentDelete;
