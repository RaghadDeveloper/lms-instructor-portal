import "./PostComments.css";
import NoComments from "../NoComments/NoComments";
import CommentInput from "../CommentInput/CommentInput";
import Comment from "../Comment/Comment";

function PostComments({
  setShowComments,
  post,
  comment,
  setComment,
  setCommentsCount,
}) {
  return (
    <>
      <div className="overlay" onClick={() => setShowComments(false)} />
      <div className="post-comments">
        {post.comments.length ? (
          <div className="e">
            {post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <NoComments />
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
