import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "./postsThunk";

const initialState = {
  loading: false,
  error: null,
  posts: [],
  post: null,
  pagination: {
    currentPage: 1,
    lastPage: 1,
    next: null,
    prev: null,
  },
};
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  const message = action.payload?.message;

  if (typeof message === "string") {
    state.error = message;
  } else if (typeof message === "object" && message !== null) {
    const messages = Object.values(message).flat().join(" ");
    state.error = messages || "Something went wrong";
  } else {
    state.error = "Something went wrong";
  }
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder

      // getAllPosts
      .addCase(getAllPosts.pending, handlePending)
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.pagination = {
          currentPage: action.payload.meta.current_page,
          lastPage: action.payload.meta.last_page,
          next: action.payload.links.next,
          prev: action.payload.links.prev,
        };
      })
      .addCase(getAllPosts.rejected, handleRejected)

      // createPost
      .addCase(createPost.pending, handlePending)
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
        state.posts.unshift(action.payload.post);
      })
      .addCase(createPost.rejected, handleRejected)

      // updatePost
      .addCase(updatePost.pending, handlePending)
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
        state.posts = state.posts.map((post) =>
          post.id === action.payload.post.id ? action.payload.post : post
        );
      })
      .addCase(updatePost.rejected, handleRejected)

      // deletePost
      .addCase(deletePost.pending, handlePending)
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.meta.arg);
      })
      .addCase(deletePost.rejected, handleRejected)

      // createComment
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;

        const commentData = action.payload.data;
        const postId = commentData.commentable_id;

        const post = state.posts.find((post) => post.id === postId);
        if (!post) return;

        if (action.payload.data.comment_parent_id) {
          const parentCommentId = commentData.comment_parent_id;

          const parentComment = post.comments.find(
            (comment) => comment.id === parentCommentId
          );

          if (parentComment) {
            if (!Array.isArray(parentComment.replies)) {
              parentComment.replies = [];
            }

            parentComment.replies.push(commentData);
          }
        } else {
          post.comments.push(commentData);
        }
      })
      .addCase(createComment.rejected, handleRejected);
  },
});

export const { setLoading } = postsSlice.actions;
export default postsSlice.reducer;
