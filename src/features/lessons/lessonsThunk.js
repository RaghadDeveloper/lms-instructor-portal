import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLessonsApi, getLessonDetailsApi } from "./lessonsApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getAllLessons = createAsyncThunk(
  "lessons/getAllLessons",
  async (courseId, thunkAPI) => {
    try {
      const response = await getAllLessonsApi(courseId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const getLessonDetails = createAsyncThunk(
  "lessons/getLessonDetails",
  async (lessonId, thunkAPI) => {
    try {
      const response = await getLessonDetailsApi(lessonId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
