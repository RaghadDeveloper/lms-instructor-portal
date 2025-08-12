import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteFileApi,
  getLessonFilesApi,
  uploadFileApi,
} from "./lessonsFilesApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getLessonFile = createAsyncThunk(
  "lessons/getFiles",
  async (lessonId, thunkAPI) => {
    try {
      const response = await getLessonFilesApi(lessonId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const uploadFile = createAsyncThunk(
  "lessons/uploadFile",
  async (file, thunkAPI) => {
    try {
      const response = await uploadFileApi(file);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const deleteFile = createAsyncThunk(
  "lessons/deleteFile",
  async (fileId, thunkAPI) => {
    try {
      const response = await deleteFileApi(fileId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
