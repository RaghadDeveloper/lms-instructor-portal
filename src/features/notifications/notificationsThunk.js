import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllNotificationsApi } from "./notificationsApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getAllNotifications = createAsyncThunk(
  "notifications/getAllNotifications",
  async (courseId, thunkAPI) => {
    try {
      const response = await getAllNotificationsApi(courseId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
