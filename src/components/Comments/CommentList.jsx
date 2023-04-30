import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getCommentsByArticleId } from "../../utils/api";
import { UserContext } from "../../contexts/User";
import CommentDelete from "./CommentDelete";
import CommentVoting from "./CommentVoting";

function CommentList({ comments, setComments }) {
  const { article_id } = useParams();
  const { user } = useContext(UserContext)

  const [sortBy, setSortBy] = useState("created_at");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id, sortBy).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [article_id, sortBy, setComments]);
  
  if (isLoading) return <p>Loading comments...</p>;

  const dateFormat = (isoDate) => {
    const date = new Date(isoDate);
    return date.toDateString();
  };

  return (
    <div>
      <h3>Comments:</h3>
      <select
        value={sortBy}
        onChange={(event) => {
          setSortBy(event.target.value);
        }}
      >
        <option value="created_at">most recent</option>
        <option value="votes">most popular</option>
      </select>
      <ul className="comment-list">
        {comments.map((comment) => {
          return (
            <li className="small-item" key={comment.comment_id}>
              <p className="comment-item__author">
                <Link to={`/users/${comment.author}`} className="topic-link">
                  {comment.author}
                </Link>{" "}
                said:
              </p>
              <p className="comment-item__body">"{comment.body}"</p>
              <p className="comment-item__created_at">
                posted at {dateFormat(comment.created_at)}
              </p>
              <CommentVoting comment={comment} />
              {user.username === comment.author ? (
                <CommentDelete
                  thisComment={comment}
                  setComments={setComments}
                  comments={comments}
                />
              ) : (
                <></>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CommentList;
