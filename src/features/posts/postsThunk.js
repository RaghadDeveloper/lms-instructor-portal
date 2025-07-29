import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPostApi } from "./postsApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

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
