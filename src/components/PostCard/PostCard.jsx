import "./PostCard.css";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { deletePost } from "../../features/posts/postsThunk";
import { useEffect, useState } from "react";
import CommentInput from "../CommentInput/CommentInput";
import Comment from "../Comment/Comment";
import NoComments from "../NoComments/NoComments";
import PostComments from "../PostComments/PostComments";

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

  const date =
    post?.created_at === post?.updated_at
      ? formatDate(post?.created_at, "Created at ")
      : formatDate(post?.updated_at, "Updated at ");
  const isMenuOpen = menuOpenPostId === post.id;

  const toggleMenu = () => {
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
            <div className="action-menu">
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
          <div>
            <AiOutlineLike />
            <span>{post.likes_count}</span>
          </div>
          <div className="divider"></div>
          <div onClick={() => setShowComments(true)}>
            <FaRegComment />
            <span>{post.comments_count}</span>
          </div>
        </div>
      </div>
      {showComments && (
        <PostComments
          showComments={showComments}
          setShowComments={setShowComments}
          post={post}
        />
      )}
    </>
  );
}

export default PostCard;
