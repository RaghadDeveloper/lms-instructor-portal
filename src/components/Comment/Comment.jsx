import { useDispatch } from "react-redux";
import "./Comment.css";
import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
import { like } from "../../features/like/likeThunk";
import { BiSolidLike } from "react-icons/bi";

function Comment({ comment, type }) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes_count);

  const handleCommentLike = () => {
    dispatch(like({ likeable_id: comment.id, likeable_type: "comment" }));
    setIsLiked(true);
    setLikes(likes + 1);
  };

  return (
    <div className={`comment ${type && "reply"}`}>
      <img className="user-img" src={comment?.author?.avatar_url} />
      <div>
        <div className="comment-content">
          <h4>{comment?.author?.username}</h4>
          <p>{comment.content}</p>
        </div>
        <div className="actions">
          <div>
            <span
              onClick={handleCommentLike}
              className={`${isLiked && "liked"}`}
            >
              Like
            </span>
            {!type && <span>Reply</span>}
          </div>
          {likes > 0 && (
            <div>
              {likes}
              <BiSolidLike className="liked" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
