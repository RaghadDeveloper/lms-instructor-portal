import "./PostsGroup.css";
import PostCard from "../PostCard/PostCard";

function PostsGroup() {
  return (
    <div className="posts-group">
      <h2>My Posts</h2>
      <div>
        <PostCard />
      </div>
    </div>
  );
}

export default PostsGroup;
