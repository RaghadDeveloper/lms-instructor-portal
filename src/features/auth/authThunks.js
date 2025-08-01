import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginAPI,
  signupAPI,
  logoutAPI,
  resetPasswordAPI,
  verificationAPI,
  resendOTPAPI,
  forgotPasswordAPI,
} from "./authAPI";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const response = await signupAPI(data);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(extractError(err));
    }
  }
);

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await loginAPI(data);
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(extractError(err));
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await logoutAPI();
    localStorage.removeItem("token");
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(extractError(err));
  }
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const response = await resetPasswordAPI(data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(extractError(err));
    }
  }
);

export const verification = createAsyncThunk(
  "auth/verification",
  async (data, thunkAPI) => {
    try {
      const response = await verificationAPI(data);
      console.log(localStorage.getItem("token"));
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(extractError(err));
    }
  }
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (_, thunkAPI) => {
    try {
      const response = await resendOTPAPI();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(extractError(err));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const response = await forgotPasswordAPI(data);
      console.log(data);
      localStorage.setItem("token", response.data.data.token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(extractError(err));
    }
  }
);
