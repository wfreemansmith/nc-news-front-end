import CommentVoting from "./CommentVoting";
import CommentDelete from "./CommentDelete";
import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../utils/api";

// declare new state for sort by query

function CommentList({ comments, setComments, user }) {
  const { article_id } = useParams();
  const [sortBy, setSortBy] = useState("created_at");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id, sortBy).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [article_id, sortBy]);

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
                <strong>{comment.author}</strong> said:
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
