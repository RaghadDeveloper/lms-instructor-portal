import { createAsyncThunk } from "@reduxjs/toolkit";
import { likeApi, unLikeApi } from "./likeApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const like = createAsyncThunk(
  "like",
  async ({ likeable_id, likeable_type }, thunkAPI) => {
    try {
      const response = await likeApi({ likeable_id, likeable_type });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const unLike = createAsyncThunk(
  "unLike",
  async ({ likeable_id, likeable_type }, thunkAPI) => {
    try {
      const response = await unLikeApi({ likeable_id, likeable_type });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
