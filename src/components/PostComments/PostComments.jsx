import "./PostComments.css";
import NoComments from "../NoComments/NoComments";
import CommentInput from "../CommentInput/CommentInput";
import Comment from "../Comment/Comment";
import { useSelector } from "react-redux";

function PostComments({
  setShowComments,
  comment,
  setComment,
  setCommentsCount,
}) {
  const { commentsLoading, comments } = useSelector((state) => state.posts);

  return (
    <>
      <div className="overlay" onClick={() => setShowComments(false)} />
      <div className="post-comments">
        {commentsLoading ? (
          <p className="comments-loading">Loading comment...</p>
        ) : (
          <>
            {comments.length ? (
              <div className="e">
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            ) : (
              <NoComments />
            )}
          </>
        )}
        <CommentInput
          comment={comment}
          setComment={setComment}
          setCommentsCount={setCommentsCount}
        />
      </div>
    </>
  );
}

export default PostComments;
