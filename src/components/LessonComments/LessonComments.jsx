import "./LessonComments.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Comment from "../Comment/Comment";
import CommentInput from "../CommentInput/CommentInput";
import { useParams } from "react-router-dom";
import NoComments from "../NoComments/NoComments";

function LessonComments({ menuOpenCommentId, setMenuOpenCommentId }) {
  const { lessonId } = useParams();
  const { commentsLoading } = useSelector((state) => state.lessons);
  const [comment, setComment] = useState({
    commentable_id: lessonId,
    commentable_type: "lesson",
    content: "",
  });
  const { comments } = useSelector((state) => state.lessons);

  return (
    <div
      className="lesson-comments card"
      onClick={() => setMenuOpenCommentId(null)}
    >
      <h2>Comments:</h2>
      {commentsLoading ? (
        <p>Loading...</p>
      ) : comments.length === 0 ? (
        <NoComments />
      ) : (
        comments?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            menuOpenCommentId={menuOpenCommentId}
            setMenuOpenCommentId={setMenuOpenCommentId}
            setComment={setComment}
          />
        ))
      )}
      <CommentInput comment={comment} setComment={setComment} />
    </div>
  );
}

export default LessonComments;
