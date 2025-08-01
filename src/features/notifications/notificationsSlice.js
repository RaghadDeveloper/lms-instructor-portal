import { createSlice } from "@reduxjs/toolkit";
import { getAllNotifications } from "./notificationsThunk";

const initialState = {
  loading: false,
  error: null,
  notifications: [],
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

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  extraReducers: (builder) => {
    builder
      // getAllNotifications
      .addCase(getAllNotifications.pending, handlePending)
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.data;
      })
      .addCase(getAllNotifications.rejected, handleRejected);
  },
});

export default notificationsSlice.reducer;
