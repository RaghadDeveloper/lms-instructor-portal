import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProfilesApi } from "./usersApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getAllProfiles = createAsyncThunk(
  "users/getAllProfiles",
  async (filters, thunkAPI) => {
    try {
      const response = await getAllProfilesApi(filters);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
