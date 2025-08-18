import "./CommentInput.css";
import { LuSend } from "react-icons/lu";

function CommentInput() {
  return (
    <div className="comment-input">
      <textarea placeholder="Write a comment..." />
      <button className="send-icon">
        <LuSend />
      </button>
    </div>
  );
}

export default CommentInput;
