import "./PostCard.css";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
function getMediaType(mediaUrl) {
  if (!mediaUrl) return null;

  const extension = mediaUrl.split(".").pop().split("?")[0];

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const videoExtensions = ["mp4", "webm", "mov"];
  const audioExtensions = ["mp3", "wav", "ogg"];

  if (imageExtensions.includes(extension)) return "image";
  if (videoExtensions.includes(extension)) return "video";
  if (audioExtensions.includes(extension)) return "audio";

  return "unknown";
}

function formatDate(dateString, label = "Created at") {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  return `${label} ${day} ${month}`;
}

function PostCard({ post }) {
  const { profile } = useSelector((state) => state.profile);
  const type = getMediaType(post.media_url);
  const date =
    post?.created_at === post?.updated_at
      ? formatDate(post?.created_at, "Created at ")
      : formatDate(post?.updated_at, "Updated at ");
  return (
    <>
      {type === "image" ? (
        <div className="post-card">
          <header className="post-card-header">
            <img src={profile.avatar_url} className="user-img" />
            <div>
              <h4 className="user-name">{post?.author?.username}</h4>
              <p className="post-date">{date}</p>
            </div>
          </header>
          <div className="post-body">
            <h5 className="title">{post?.title}</h5>
            <p className="text">{post?.content}</p>
            <img src={post.media_url} className="img" />
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
      ) : type === "video" ? (
        <div className="post-card">
          <header className="post-card-header">
            <img src={profile.avatar_url} className="user-img" />
            <div>
              <h4 className="user-name">{post?.author?.username}</h4>
              <p className="post-date">{date}</p>
            </div>
          </header>
          <div className="post-body">
            <h5 className="title">{post?.title}</h5>
            <p className="text">{post?.content}</p>
            <video className="video" controls>
              <source src={post.media_url} type="video/mp4" />
            </video>
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
      ) : (
        <div className="post-card">
          <header className="post-card-header">
            <img src={profile.avatar_url} className="user-img" />
            <div>
              <h4 className="user-name">{post?.author?.username}</h4>
              <p className="post-date">{date}</p>
            </div>
          </header>
          <div className="post-body">
            <h5 className="title">{post?.title}</h5>
            <p className="text">{post?.content}</p>
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
      )}
    </>
  );
}

export default PostCard;
