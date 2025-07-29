import "./Posts.css";
import PostsGroup from "../../components/PostsGroup/PostsGroup";
import CreatePost from "../../components/CreatePost/CreatePost";

function Posts() {
  return (
    <div className="posts">
      <PostsGroup />
      <CreatePost />
    </div>
  );
}

export default Posts;
