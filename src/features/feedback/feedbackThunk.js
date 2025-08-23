import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendFeedbackApi } from "./feedbackApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const sendFeedback = createAsyncThunk(
  "feedback/send",
  async (data, thunkAPI) => {
    try {
      const response = await sendFeedbackApi(data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(extractError(err));
    }
  }
);
