import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCommentApi,
  createPostApi,
  deletePostApi,
  getAllPostsApi,
  getPostCommentsApi,
  updatePostApi,
} from "./postsApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async ({ userId, page }, thunkAPI) => {
    try {
      const response = await getAllPostsApi(userId, page);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const createPost = createAsyncThunk(
  "post/create",
  async (data, thunkAPI) => {
    try {
      const response = await createPostApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/update",
  async (data, thunkAPI) => {
    try {
      const response = await updatePostApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (post_id, thunkAPI) => {
    try {
      const response = await deletePostApi(post_id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const getPostComments = createAsyncThunk(
  "post/getComments",
  async (postId, thunkAPI) => {
    try {
      const response = await getPostCommentsApi(postId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const createComment = createAsyncThunk(
  "postcomment/create",
  async (data, thunkAPI) => {
    try {
      const response = await createCommentApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
