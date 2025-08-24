import { useDispatch } from "react-redux";
import "./Comment.css";
import { useState } from "react";
import { like, unLike } from "../../features/like/likeThunk";
import { BiSolidLike } from "react-icons/bi";
import CommentReplies from "../CommentReplies/CommentReplies";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  deletePostComment,
  getPostComments,
} from "../../features/posts/postsThunk";
import {
  deleteLessonComment,
  getLessonComments,
} from "../../features/lessons/lessonsThunk";

function Comment({
  comment,
  type,
  menuOpenCommentId,
  setMenuOpenCommentId,
  setCommentsCount,
  setComment,
}) {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(comment.is_liked);
  const [likes, setLikes] = useState(comment.likes_count);
  const [isReply, setIsReply] = useState(false);

  const isMenuOpen = menuOpenCommentId === comment.id;

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (isMenuOpen) {
      setMenuOpenCommentId(null);
    } else {
      setMenuOpenCommentId(comment.id);
    }
  };

  const handleCommentLike = () => {
    if (isLiked) {
      dispatch(unLike({ likeable_id: comment.id, likeable_type: "comment" }));
      setIsLiked(false);
      setLikes(likes - 1);
    } else {
      dispatch(like({ likeable_id: comment.id, likeable_type: "comment" }));
      setIsLiked(true);
      setLikes(likes + 1);
    }
  };

  const handleEditComment = () => {
    setComment({ ...comment, content: comment.content });
    setMenuOpenCommentId(null);
  };

  const handleDeleteComment = async () => {
    if (comment.commentable_type === "App\\Models\\Post") {
      const resultAction = await dispatch(deletePostComment(comment.id));
      if (deletePostComment.fulfilled.match(resultAction)) {
        if (comment?.replies?.length > 0)
          setCommentsCount((prev) => prev - comment.replies.length);
        setCommentsCount((prev) => prev - 1);
        dispatch(getPostComments(comment.commentable_id));
      }
    } else if (comment.commentable_type === "App\\Models\\Lesson") {
      const resultAction = await dispatch(deleteLessonComment(comment.id));
      if (deleteLessonComment.fulfilled.match(resultAction)) {
        dispatch(getLessonComments(comment.commentable_id));
      }
    }
  };

  return (
    <>
      <div className={`comment ${type && "reply"}`}>
        <img className="user-img" src={comment?.author?.avatar_url} />
        <div>
          <div className="comment-content">
            <h4>{comment?.author?.username}</h4>
            <p>{comment.content}</p>
            <span className="action-btn" onClick={toggleMenu}>
              <HiOutlineDotsVertical />
            </span>
            {isMenuOpen && (
              <div className="action-menu" onClick={(e) => e.stopPropagation()}>
                <p onClick={handleEditComment}>Edit </p>
                <p onClick={handleDeleteComment}>Delete </p>
              </div>
            )}
          </div>
          <div className="reactions">
            <div>
              <span
                onClick={handleCommentLike}
                className={`${isLiked && "liked"}`}
              >
                Like
              </span>
              {!type && <span onClick={() => setIsReply(true)}>Reply</span>}
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
      {isReply && (
        <CommentReplies
          comment={comment}
          menuOpenCommentId={menuOpenCommentId}
          setMenuOpenCommentId={setMenuOpenCommentId}
          setCommentsCount={setCommentsCount}
        />
      )}
    </>
  );
}

export default Comment;
