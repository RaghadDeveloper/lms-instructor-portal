import { useDispatch } from "react-redux";
import "./CommentInput.css";
import { LuSend } from "react-icons/lu";
import {
  createPostComment,
  updatePostComment,
} from "../../features/posts/postsThunk";
import {
  createLessonComment,
  updateLessonComment,
} from "../../features/lessons/lessonsThunk";

function CommentInput({ comment, setComment, setCommentsCount }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.id) {
      if (comment.commentable_type === "App\\Models\\Post") {
        const result = await dispatch(
          updatePostComment({ ...comment, comment_id: comment.id })
        );
        if (updatePostComment.fulfilled.match(result))
          setComment({ ...comment, content: "" });
      } else if (comment.commentable_type === "App\\Models\\Lesson") {
        const result = await dispatch(
          updateLessonComment({ ...comment, comment_id: comment.id })
        );
        if (updateLessonComment.fulfilled.match(result))
          setComment({ ...comment, content: "" });
      }
    } else if (comment.commentable_type === "post") {
      const result = await dispatch(createPostComment(comment));
      if (createPostComment.fulfilled.match(result)) {
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
