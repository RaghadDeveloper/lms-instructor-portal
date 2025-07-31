import "./Posts.css";
import PostsGroup from "../../components/PostsGroup/PostsGroup";
import PostEditor from "../../components/PostEditor/PostEditor";
import { useState } from "react";

function Posts() {
  const [editPost, setEditPost] = useState(null);
  return (
    <div className="posts">
      <PostsGroup setEditPost={setEditPost} />
      <PostEditor editPost={editPost} setEditPost={setEditPost} />
    </div>
  );
}

export default Posts;
