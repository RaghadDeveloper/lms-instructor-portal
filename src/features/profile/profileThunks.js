import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProfileApi,
  getMyFollowersApi,
  getProfileApi,
  storeUserCategoriesApi,
  // updateAvatarApi,
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
  async (_, thunkAPI) => {
    try {
      const response = await getMyFollowersApi();
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

// export const updateAvatar = createAsyncThunk(
//   "profile/updateAvatar",
//   async (avatar_url, thunkAPI) => {
//     try {
//       const response = await updateAvatarApi(avatar_url);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(extractError(error));
//     }
//   }
// );
