import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProfileApi,
  deleteProfileApi,
  getMyFollowersApi,
  getProfileApi,
  storeUserCategoriesApi,
  updateProfileApi,
} from "./profileApi";

const extractError = (error) => {
  return (
    error?.response?.data || {
      message: "An unexpected error occurred. Please try again.",
    }
  );
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getProfileApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const getMyFollowers = createAsyncThunk(
  "profile/getFollowers",
  async (page, thunkAPI) => {
    try {
      const response = await getMyFollowersApi(page);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (profileData, thunkAPI) => {
    try {
      const response = await createProfileApi(profileData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const storeUserCategories = createAsyncThunk(
  "profile/storeUserCategory",
  async (categoryData, thunkAPI) => {
    try {
      const response = await storeUserCategoriesApi(categoryData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (data, thunkAPI) => {
    try {
      const response = await updateProfileApi(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "profile/update",
  async (_, thunkAPI) => {
    try {
      const response = await deleteProfileApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(extractError(error));
    }
  }
);
