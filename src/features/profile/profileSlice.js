import { createSlice } from "@reduxjs/toolkit";
import {
  createProfile,
  getMyFollowers,
  getProfile,
  storeUserCategories,
  updateProfile,
} from "./profileThunks";

const initialState = {
  loading: false,
  error: null,
  categoryError: null,
  profile: null,
  categories: null,
  followers: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
  },
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  const message = action.payload?.message;

  if (typeof message === "string") {
    state.error = message;
  } else if (typeof message === "object" && message !== null) {
    const messages = Object.values(message).flat().join(" ");
    state.error = messages || "Something went wrong";
  } else {
    state.error = "Something went wrong";
  }
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder

      // getProfile
      .addCase(getProfile.pending, handlePending)
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.profile = action.payload.data.profile;
        state.categories = action.payload.data.profile.categories;
      })
      .addCase(getProfile.rejected, handleRejected)

      // getFollowers
      .addCase(getMyFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.followers = [...state.followers, ...action.payload.data];
        state.pagination = {
          currentPage: action.payload.meta.current_page,
          lastPage: action.payload.meta.last_page,
        };
      })
      .addCase(getMyFollowers.rejected, handleRejected)

      // createProfile
      .addCase(createProfile.pending, handlePending)
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.profile = action.payload.data;
      })
      .addCase(createProfile.rejected, handleRejected)

      // storeCategories
      .addCase(storeUserCategories.pending, (state) => {
        state.loading = true;
        state.categoryError = null;
      })
      .addCase(storeUserCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryError = null;
        state.categories = action.payload.categories;
      })
      .addCase(storeUserCategories.rejected, handleRejected)

      // updateAvatar
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.profile = action.payload.data;
      })
      .addCase(updateProfile.rejected, handleRejected);
  },
});

export default profileSlice.reducer;
