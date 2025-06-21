import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCourseApi } from "./courseApi";

export const createCourse = createAsyncThunk(
  "course/create",
  async (_, thunkAPI) => {
    try {
      const response = await createCourseApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || {
          message: "An unexpected error occurred. Please try again.",
        }
      );
    }
  }
);
