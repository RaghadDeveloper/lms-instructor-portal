import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createLessonApi,
  getAllLessonsApi,
  getLessonDetailsApi,
  updateLessonApi,
} from "./lessonsApi";

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

export const createLesson = createAsyncThunk(
  "lesson/create",
  async (lessonInfo, thunkAPI) => {
    try {
      const response = await createLessonApi(lessonInfo);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const updateLesson = createAsyncThunk(
  "lesson/update",
  async ({ lessonId, lessonInfo }, thunkAPI) => {
    try {
      const response = await updateLessonApi({ lessonId, lessonInfo });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
