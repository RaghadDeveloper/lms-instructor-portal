import "./PostComments.css";
import NoComments from "../NoComments/NoComments";
import CommentInput from "../CommentInput/CommentInput";
import Comment from "../Comment/Comment";

function PostComments({ setShowComments, post }) {
  return (
    <>
      <div className="overlay" onClick={() => setShowComments(false)} />
      <div className="post-comments">
        {post.comments.length ? (
          <div className="e">
            {post.comments.map((comment) => (
              <>
                <Comment key={comment.id} comment={comment} />
                {comment?.replies?.map((reply) => (
                  <Comment key={reply.id} comment={reply} type={"reply"} />
                ))}
              </>
            ))}
          </div>
        ) : (
          <NoComments />
        )}
        <CommentInput />
      </div>
    </>
  );
}

export default PostComments;
