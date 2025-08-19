import "./LessonComments.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import CommentInput from "../CommentInput/CommentInput";
import { useParams } from "react-router-dom";

function LessonComments() {
  const { lessonId } = useParams();
  const [comment, setComment] = useState({
    commentable_id: lessonId,
    commentable_type: "lesson",
    content: "",
  });
  const { comments } = useSelector((state) => state.lessons);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <div className="lesson-comments card">
      <h2>Comments:</h2>
      {comments.length === 0 && <p>No comments yet</p>}
      {comments?.map((comment) => (
        <Comment comment={comment} />
      ))}
      <CommentInput comment={comment} setComment={setComment} />
    </div>
  );
}

export default LessonComments;
