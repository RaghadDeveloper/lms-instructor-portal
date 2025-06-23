import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCourseApi,
  getAllCoursesApi,
  getCourseDetailsApi,
  updateCourseApi,
} from "./courseApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async (_, thunkAPI) => {
    try {
      const response = await getAllCoursesApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const getCourseDetails = createAsyncThunk(
  "courses/getCourseDetails",
  async (courseId, thunkAPI) => {
    try {
      const response = await getCourseDetailsApi(courseId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const createCourse = createAsyncThunk(
  "course/create",
  async (data, thunkAPI) => {
    try {
      const response = await createCourseApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const updateCourse = createAsyncThunk(
  "course/update",
  async ({ courseId, courseInfo }, thunkAPI) => {
    try {
      const response = await updateCourseApi({ courseId, courseInfo });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
