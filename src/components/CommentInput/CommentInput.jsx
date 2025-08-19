import { useDispatch } from "react-redux";
import "./CommentInput.css";
import { LuSend } from "react-icons/lu";
import { createComment } from "../../features/posts/postsThunk";
import { createLessonComment } from "../../features/lessons/lessonsThunk";

function CommentInput({ comment, setComment, setCommentsCount }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.commentable_type === "post") {
      const result = await dispatch(createComment(comment));
      if (createComment.fulfilled.match(result)) {
        setCommentsCount((prev) => prev + 1);
        setComment({ ...comment, content: "" });
      }
    } else if (comment.commentable_type === "lesson") {
      const result = await dispatch(createLessonComment(comment));
      if (createLessonComment.fulfilled.match(result)) {
        setComment({ ...comment, content: "" });
      }
    }
  };

  return (
    <div className="comment-input">
      <textarea
        placeholder="Write a comment..."
        value={comment.content}
        onChange={(e) => setComment({ ...comment, content: e.target.value })}
      />
      <button
        className="send-icon"
        onClick={handleSubmit}
        disabled={!comment.content}
      >
        <LuSend />
      </button>
    </div>
  );
}

export default CommentInput;
