import { useParams } from "react-router-dom";
import { useEffect} from "react";
import { getCommentsByArticleId } from "../utils/api";

import CommentVoting from "./CommentVoting";
import CommentDelete from "./CommentDelete";

function CommentList({ comments, setComments, isLoading, setIsLoading, user }) {
  const { article_id } = useParams();
  

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) return <p>Loading comments...</p>;

  function dateFormat(isoDate) {
    const date = new Date(isoDate);
    return date.toDateString();
  }



  return (
    <div>
      <h3>Comments:</h3>
      <ul className="comment-list">
        {comments.map((comment) => {
          return (
            <li className="comment-item" key={comment.comment_id}>
              <p className="comment-item__author">
                <strong>{comment.author}</strong> said:
              </p>
              <p className="comment-item__body">"{comment.body}"</p>
              <p className="comment-item__created_at">
                posted at {dateFormat(comment.created_at)}
              </p>
              <CommentVoting comment={comment} />
              {user.username === comment.author ? <CommentDelete thisComment={comment} setComments={setComments} comments={comments}/> : (
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
