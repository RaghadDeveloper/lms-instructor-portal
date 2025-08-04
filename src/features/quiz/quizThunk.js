import { createAsyncThunk } from "@reduxjs/toolkit";
import { getQuizApi } from "./quizApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};
export const getQuiz = createAsyncThunk(
  "quiz/getQuiz",
  async (quizId, thunkAPI) => {
    try {
      const response = await getQuizApi(quizId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
