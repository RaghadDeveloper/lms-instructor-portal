import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "./postsThunk";

const initialState = {
  loading: false,
  error: null,
  posts: [],
  post: null,
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
      // createPost
      .addCase(createPost.pending, handlePending)
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload.post;
        state.posts.push(action.payload.post);
      })
      .addCase(createPost.rejected, handleRejected);
  },
});

export const { setLoading } = postsSlice.actions;
export default postsSlice.reducer;
