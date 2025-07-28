import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyFollowersApi, getProfileApi } from "./profileApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getProfileApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const getMyFollowers = createAsyncThunk(
  "profile/getFollowers",
  async (_, thunkAPI) => {
    try {
      const response = await getMyFollowersApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
