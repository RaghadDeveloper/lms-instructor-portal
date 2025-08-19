import { useDispatch } from "react-redux";
import "./CommentReplies.css";
import { createComment } from "../../features/posts/postsThunk";
import { useState } from "react";
import Comment from "../Comment/Comment";
import { LuSend } from "react-icons/lu";

function CommentReplies({ comment }) {
  const dispatch = useDispatch();
  const [reply, setReply] = useState({
    commentable_id: comment.commentable_id,
    commentable_type: comment.commentable_type,
    content: "",
    comment_parent_id: comment.id,
  });

  const handleCreateReply = async () => {
    const result = await dispatch(createComment(reply));
    if (createComment.fulfilled.match(result)) {
      setReply({ ...reply, content: "" });
    }
  };

  return (
    <>
      {comment?.replies?.map((reply) => (
        <Comment key={reply.id} comment={reply} type={"reply"} />
      ))}
      <div className="reply-input">
        <textarea
          placeholder="Reply to comment ..."
          value={reply.content}
          onChange={(e) => setReply({ ...reply, content: e.target.value })}
        />

        <button disabled={!reply.content.length}>
          <LuSend className="icon" onClick={handleCreateReply} />
        </button>
      </div>
    </>
  );
}

export default CommentReplies;
