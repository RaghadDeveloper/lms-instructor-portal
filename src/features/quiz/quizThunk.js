import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addQuestionApi,
  createQuizApi,
  deleteQuestionApi,
  getQuizApi,
  updateQuestionApi,
} from "./quizApi";

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

export const addQuestion = createAsyncThunk(
  "quiz/addQuestion",
  async (data, thunkAPI) => {
    try {
      const response = await addQuestionApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "quiz/updateQuestion",
  async ({ questionId, question }, thunkAPI) => {
    try {
      const response = await updateQuestionApi({ questionId, question });
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
