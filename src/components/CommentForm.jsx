import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../utils/api";

function CommentForm({ user, comments, setComments, isLoading }) {
  const { article_id } = useParams();
  const [body, setBody] = useState("");
  const [validation, setValidation] = useState("valid");

  if (isLoading) return;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!body.length) {
      setValidation("error invalid");
      return;
    }

    setValidation("in-progress");

    const input = {
      username: user.username,
      body,
    };

    postComment(input, article_id)
      .then(({ comment }) => {
        setComments([comment, ...comments]);
        setValidation("success");
        setBody("");
      })
      .catch(() => {
        setValidation("error other");
      });
  };

  return (
    <form className="small-item comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment-form__input">
        Commenting as <strong>{user.username}</strong>
      </label>
      <textarea
        id="comment-form__input"
        className={validation}
        value={body}
        onChange={(event) => {
          setValidation("valid");
          setBody(event.target.value);
        }}
      ></textarea>
      <button className={validation} type="submit">
        {validation === "error invalid"
          ? "Field cannot be blank"
          : validation === "error other"
          ? "Something went wrong"
          : validation === "in-progress"
          ? "Posting..."
          : validation === "success"
          ? "Success!"
          : "Post"}
      </button>
    </form>
  );
}

export default CommentForm;
