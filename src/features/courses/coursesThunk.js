import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCoursesApi,
  createCourseApi,
  getCourseDetailsApi,
  searchCoursesApi,
  updateCourseApi,
  searchCourseTitleApi,
  deleteCourseApi,
} from "./coursesApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getCourses = createAsyncThunk(
  "courses/filterCourses",
  async (filters, thunkAPI) => {
    try {
      const response = await getCoursesApi(filters);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const searchCourseTitle = createAsyncThunk(
  "courses/searchCourseTitle",
  async (search_key, thunkAPI) => {
    try {
      const response = await searchCourseTitleApi(search_key);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const searchCourses = createAsyncThunk(
  "courses/searchCourses",
  async (search_key, thunkAPI) => {
    try {
      const response = await searchCoursesApi(search_key);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const getCourseDetails = createAsyncThunk(
  "course/getCourseDetails",
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

export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (courseId, thunkAPI) => {
    try {
      const response = await deleteCourseApi(courseId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
