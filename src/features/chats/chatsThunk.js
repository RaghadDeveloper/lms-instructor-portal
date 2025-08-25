import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteChatApi,
  getAllChatApi,
  getChatApi,
  getUserProfileApi,
  sendMessageApi,
} from "./chatsApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getAllChat = createAsyncThunk(
  "getAllChats",
  async (_, thunkAPI) => {
    try {
      const response = await getAllChatApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const getChat = createAsyncThunk("getChat", async (chatId, thunkAPI) => {
  try {
    const response = await getChatApi(chatId);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractError(error));
  }
});

export const deleteChat = createAsyncThunk(
  "deleteChat",
  async (chatId, thunkAPI) => {
    try {
      const response = await deleteChatApi(chatId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (userId, thunkAPI) => {
    try {
      const response = await getUserProfileApi(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/send",
  async (message, thunkAPI) => {
    try {
      const response = await sendMessageApi(message);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
