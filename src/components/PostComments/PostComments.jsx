import "./PostComments.css";
import NoComments from "../NoComments/NoComments";
import CommentInput from "../CommentInput/CommentInput";
import Comment from "../Comment/Comment";
import { useSelector } from "react-redux";
import { useState } from "react";

function PostComments({ setShowComments, setCommentsCount, postId }) {
  const [menuOpenCommentId, setMenuOpenCommentId] = useState(null);
  const { commentsLoading, comments } = useSelector((state) => state.posts);
  const [comment, setComment] = useState({
    commentable_id: postId,
    commentable_type: "post",
    content: "",
  });

  return (
    <>
      <div className="overlay" onClick={() => setShowComments(false)} />
      <div className="post-comments" onClick={() => setMenuOpenCommentId(null)}>
        {commentsLoading ? (
          <p className="comments-loading">Loading comment...</p>
        ) : (
          <>
            {comments.length ? (
              <div className="e">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    menuOpenCommentId={menuOpenCommentId}
                    setMenuOpenCommentId={setMenuOpenCommentId}
                    setCommentsCount={setCommentsCount}
                    setComment={setComment}
                  />
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
