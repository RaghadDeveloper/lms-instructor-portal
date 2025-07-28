import { createSlice } from "@reduxjs/toolkit";
import { getMyFollowers, getProfile } from "./profileThunks";

const initialState = {
  loading: false,
  error: null,
  profile: null,
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
    // getProfile
    builder.addCase(getProfile.pending, handlePending);
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.profile = action.payload.profile;
    });
    builder.addCase(getProfile.rejected, handleRejected);

    // getFollowers
    builder.addCase(getMyFollowers.pending, handlePending);
    builder.addCase(getMyFollowers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.followers = action.payload.data;
    });
    builder.addCase(getMyFollowers.rejected, handleRejected);
  },
});

export default profileSlice.reducer;
