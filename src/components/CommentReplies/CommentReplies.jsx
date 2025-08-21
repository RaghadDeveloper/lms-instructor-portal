import { useDispatch } from "react-redux";
import "./CommentReplies.css";
import { createPostComment } from "../../features/posts/postsThunk";
import { useState } from "react";
import Comment from "../Comment/Comment";
import { LuSend } from "react-icons/lu";
import { createLessonComment } from "../../features/lessons/lessonsThunk";

function CommentReplies({
  comment,
  menuOpenCommentId,
  setMenuOpenCommentId,
  setCommentsCount,
}) {
  const dispatch = useDispatch();
  const [reply, setReply] = useState({
    commentable_id: comment.commentable_id,
    commentable_type: comment.commentable_type,
    content: "",
    comment_parent_id: comment.id,
  });

  const handleCreateReply = async () => {
    if (reply.commentable_type === "App\\Models\\Post") {
      const result = await dispatch(createPostComment(reply));
      if (createPostComment.fulfilled.match(result)) {
        setCommentsCount((prev) => prev + 1);
        setReply({ ...reply, content: "" });
      }
    } else if (reply.commentable_type === "App\\Models\\Lesson") {
      const result = await dispatch(createLessonComment(reply));
      if (createLessonComment.fulfilled.match(result)) {
        setReply({ ...reply, content: "" });
      }
    }
  };

  return (
    <>
      {comment?.replies?.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          type={"reply"}
          menuOpenCommentId={menuOpenCommentId}
          setMenuOpenCommentId={setMenuOpenCommentId}
          setCommentsCount={setCommentsCount}
        />
      ))}
      <div className="reply-input">
        <textarea
          placeholder="Reply to comment ..."
          value={reply.content}
          onChange={(e) => setReply({ ...reply, content: e.target.value })}
        />

        <button className="submit-icon" disabled={!reply.content.length}>
          <LuSend className="icon" onClick={handleCreateReply} />
        </button>
      </div>
    </>
  );
}

export default CommentReplies;
