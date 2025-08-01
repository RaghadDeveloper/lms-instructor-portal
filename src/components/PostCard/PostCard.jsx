import "./PostCard.css";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";

function formatDate(dateString, label = "Created at") {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${label} ${day} ${month}`;
}

function PostCard({ post, setEditPost }) {
  const { profile } = useSelector((state) => state.profile);
  const date =
    post?.created_at === post?.updated_at
      ? formatDate(post?.created_at, "Created at ")
      : formatDate(post?.updated_at, "Updated at ");

  const handleEdit = () => {
    setEditPost(post);
  };

  return (
    <div className="post-card">
      <header className="post-card-header">
        <div>
          <img src={profile.avatar_url} className="user-img" />
          <div>
            <h4 className="user-name">{post?.author?.username}</h4>
            <p className="post-date">{date}</p>
          </div>
        </div>
        <span className="edit-btn" onClick={handleEdit}>
          <CiEdit />
        </span>
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
          <span>X</span>
        </div>
        <div className="divider"></div>
        <div>
          <FaRegComment />
          <span>X</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
