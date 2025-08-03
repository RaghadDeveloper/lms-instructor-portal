import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  coursesStatisticsApi,
  earningsStatisticsApi,
  followsStatisticsApi,
  lessonsStatisticsApi,
} from "./statisticsApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const coursesStatistics = createAsyncThunk(
  "statistics/courses",
  async (year, thunkAPI) => {
    try {
      const response = await coursesStatisticsApi(year);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const lessonsStatistics = createAsyncThunk(
  "statistics/lessons",
  async (year, thunkAPI) => {
    try {
      const response = await lessonsStatisticsApi(year);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const followsStatistics = createAsyncThunk(
  "statistics/follows",
  async (year, thunkAPI) => {
    try {
      const response = await followsStatisticsApi(year);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const earningsStatistics = createAsyncThunk(
  "statistics/earnings",
  async (year, thunkAPI) => {
    try {
      const response = await earningsStatisticsApi(year);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
