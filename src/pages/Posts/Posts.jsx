import "./Posts.css";
import PostsGroup from "../../components/PostsGroup/PostsGroup";
import PostEditor from "../../components/PostEditor/PostEditor";
import { useState } from "react";

function Posts() {
  const [editPost, setEditPost] = useState(null);
  const [menuOpenPostId, setMenuOpenPostId] = useState(null);

  return (
    <div className="posts" onClick={() => setMenuOpenPostId(null)}>
      <PostsGroup
        setEditPost={setEditPost}
        menuOpenPostId={menuOpenPostId}
        setMenuOpenPostId={setMenuOpenPostId}
      />
      <PostEditor editPost={editPost} setEditPost={setEditPost} />
    </div>
  );
}

export default Posts;
