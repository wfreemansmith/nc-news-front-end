import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../../utils/api";
import { UserContext } from "../../contexts/User";
import { ThemeContext } from "../../contexts/Theme";

function CommentForm({ comments, setComments, isLoading, setPopUp }) {
  const { article_id } = useParams();
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const isUser = Object.keys(user).length;

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
      .catch((err) => {
        setValidation("error other");
        console.log(err);
      });
  };

  return (
    <>
      {!isUser ? (
        <div className="small-item">
          <p>Please sign in before commenting.</p>
          <button
            className={`login__button ${theme}`}
            onClick={() => {
              setPopUp(true);
            }}
          >
            Log in
          </button>
        </div>
      ) : (
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
      )}
    </>
  );
}

export default CommentForm;
