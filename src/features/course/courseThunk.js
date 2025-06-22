import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCourseApi, getAllCoursesApi } from "./courseApi";

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
