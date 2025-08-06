import { createAsyncThunk } from "@reduxjs/toolkit";
import { createQuizApi, deleteQuestionApi, getQuizApi } from "./quizApi";

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

export const createQuiz = createAsyncThunk(
  "quiz/create",
  async (data, thunkAPI) => {
    try {
      const response = await createQuizApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  "quiz/deleteQuestion",
  async (questionId, thunkAPI) => {
    try {
      const response = await deleteQuestionApi(questionId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
