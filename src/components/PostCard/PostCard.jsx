import "./PostCard.css";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { deletePost, getPostComments } from "../../features/posts/postsThunk";
import { useEffect, useState } from "react";
import PostComments from "../PostComments/PostComments";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { like } from "../../features/like/likeThunk";

function formatDate(dateString, label = "Created at") {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${label} ${day} ${month}`;
}

function PostCard({ post, setEditPost, menuOpenPostId, setMenuOpenPostId }) {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes_count);
  const [commentsCount, setCommentsCount] = useState(post.comments_count);
  const [comment, setComment] = useState({
    commentable_id: post.id,
    commentable_type: "post",
    content: "",
  });

  const date =
    post?.created_at === post?.updated_at
      ? formatDate(post?.created_at, "Created at ")
      : formatDate(post?.updated_at, "Updated at ");
  const isMenuOpen = menuOpenPostId === post.id;

  const toggleMenu = (e) => {
    e.stopPropagation();
    if (isMenuOpen) {
      setMenuOpenPostId(null);
    } else {
      setMenuOpenPostId(post.id);
    }
  };

  const handleEdit = () => {
    setEditPost(post);
    setMenuOpenPostId(null);
  };

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const handlePostLike = () => {
    dispatch(like({ likeable_id: post.id, likeable_type: "post" }));
    setIsLiked(true);
    setLikes(likes + 1);
  };

  useEffect(() => {
    if (showComments) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showComments]);

  return (
    <>
      <div className="post-card">
        <header className="post-card-header">
          <div className="head">
            <img src={profile.avatar_url} className="user-img" />
            <div>
              <h4 className="user-name">{post?.author?.username}</h4>
              <p className="post-date">{date}</p>
            </div>
          </div>
          <span className="action-btn" onClick={toggleMenu}>
            <HiOutlineDotsVertical />
          </span>
          {isMenuOpen && (
            <div className="action-menu" onClick={(e) => e.stopPropagation()}>
              <p onClick={handleEdit}>Edit post</p>
              <p onClick={handleDelete}>Delete post</p>
            </div>
          )}
        </header>
        <div className="post-body">
          <h5 className="title">{post?.title}</h5>
          <pre className="text">{post?.content}</pre>
          {post["App\\Enums\\media_types"] === "image" && (
            <img src={post.media_url} className="img" />
          )}
          {post["App\\Enums\\media_types"] === "video" && (
            <video className="video" controls>
              <source src={post.media_url} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="post-footer">
          <div onClick={handlePostLike}>
            {isLiked ? <BiSolidLike className="liked" /> : <BiLike />}
            <span>{likes}</span>
          </div>
          <div className="divider"></div>
          <div
            onClick={() => {
              setShowComments(true);
              dispatch(getPostComments(post.id));
            }}
          >
            <FaRegComment />
            <span>{commentsCount}</span>
          </div>
        </div>
      </div>
      {showComments && (
        <PostComments
          showComments={showComments}
          setShowComments={setShowComments}
          comment={comment}
          setComment={setComment}
          setCommentsCount={setCommentsCount}
        />
      )}
    </>
  );
}

export default PostCard;
