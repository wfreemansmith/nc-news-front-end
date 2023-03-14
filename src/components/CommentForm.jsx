import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../utils/api";

function CommentForm({ user, comments, setComments }) {
  const [body, setBody] = useState("Comments!");
  const [validation, setValidation] = useState("working");
  const { article_id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!body.length) {
      setValidation("error");
      return;
    }

    setValidation("posting");

    const input = {
      username: user.username,
      body,
    };

    postComment(input, article_id).then(({ comment }) => {
      setComments([comment, ...comments]);
      setValidation("success");
      setBody("");
    });

  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment-form__input">
        Commenting as <strong>{user.username}</strong>
      </label>
      <textarea
        id="comment-form__input"
        className={validation}
        value={body}
        onChange={(event) => {
          setValidation("working");
          setBody(event.target.value);
        }}
      ></textarea>
      <button className={validation} type="submit">
        {validation === "error"
          ? "Field cannot be blank"
          : validation === "posting"
          ? "Posting..."
          : validation === "success"
          ? "Success!"
          : "Post"}
      </button>
    </form>
  );
}

export default CommentForm;
