import { createSlice } from "@reduxjs/toolkit";
import {
  createProfile,
  getMyFollowers,
  getProfile,
  storeUserCategories,
  // updateAvatar,
} from "./profileThunks";

const initialState = {
  loading: false,
  error: null,
  profile: null,
  categories: null,
  followers: null,
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
      .addCase(getMyFollowers.pending, handlePending)
      .addCase(getMyFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.followers = action.payload.data;
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
      .addCase(storeUserCategories.pending, handlePending)
      .addCase(storeUserCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload.categories;
      })
      .addCase(storeUserCategories.rejected, handleRejected);

    // updateAvatar
    // .addCase(updateAvatar.pending, handlePending)
    // .addCase(updateAvatar.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = null;
    // })
    // .addCase(updateAvatar.rejected, handleRejected);
  },
});

export default profileSlice.reducer;
