import "./PostsGroup.css";
import PostCard from "../PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../features/posts/postsThunk";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import NoPosts from "../NoPosts/NoPosts";

function PostsGroup({ setEditPost }) {
  const dispatch = useDispatch();
  const [menuOpenPostId, setMenuOpenPostId] = useState(null);
  const [page, setPage] = useState(1);
  const { loading, error, posts, pagination } = useSelector(
    (state) => state.posts
  );
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllPosts({ userId: profile.user_id, page }));
  }, [dispatch, profile.user_id, page]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="posts-group">
        <ErrorMessage error={error} />
      </div>
    );

  if (!posts.length) return <NoPosts />;

  return (
    <div className="posts-group">
      <header>
        <h2>My Posts</h2>
        <div className="pagination-controls">
          <button
            disabled={!pagination.prev}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <GrFormPrevious />
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.lastPage}
          </span>
          <button
            disabled={!pagination.next}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <GrFormNext />
          </button>
        </div>
      </header>
      <div>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            setEditPost={setEditPost}
            menuOpenPostId={menuOpenPostId}
            setMenuOpenPostId={setMenuOpenPostId}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsGroup;
