import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPostApi, getAllPostsApi } from "./postsApi";

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
      console.log(data);
      const response = await createPostApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
