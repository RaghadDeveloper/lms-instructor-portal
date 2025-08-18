import "./Comment.css";
import { AiOutlineLike } from "react-icons/ai";

function Comment({ comment, type }) {
  return (
    <div className={`comment ${type && "reply"}`}>
      <img className="user-img" src={comment.author.avatar_url} />
      <div>
        <div className="comment-content">
          <h4>{comment.author.username}</h4>
          <p>{comment.content}</p>
        </div>
        <div className="actions">
          <div>
            <span>Like</span>
            {!type && <span>Reply</span>}
          </div>
          {comment.likes_count > 0 && (
            <div>
              {comment.likes_count}
              <AiOutlineLike />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
