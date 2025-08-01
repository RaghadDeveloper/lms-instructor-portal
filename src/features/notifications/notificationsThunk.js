import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteNotificationApi,
  getAllNotificationsApi,
  readAllNotificationsApi,
  readNotificationApi,
} from "./notificationsApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getAllNotifications = createAsyncThunk(
  "notifications/getAllNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await getAllNotificationsApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const readNotification = createAsyncThunk(
  "notifications/readNotifications",
  async (notificationId, thunkAPI) => {
    try {
      await readNotificationApi(notificationId);
      // return response.data;
      return { id: notificationId };
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotifications",
  async (notificationId, thunkAPI) => {
    try {
      await deleteNotificationApi(notificationId);
      return { id: notificationId };
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const readAllNotifications = createAsyncThunk(
  "notifications/readAllNotifications",
  async (_, thunkAPI) => {
    try {
      const response = await readAllNotificationsApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
