import { createSlice } from "@reduxjs/toolkit";
import {
  deleteNotification,
  getAllNotifications,
  readAllNotifications,
  readNotification,
} from "./notificationsThunk";

const initialState = {
  loading: false,
  error: null,
  notifications: [],
  notification: null,
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
      .addCase(getAllNotifications.rejected, handleRejected)

      // readNotification
      .addCase(readNotification.pending, handlePending)
      .addCase(readNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.map((notification) =>
          notification.id === action.payload.id
            ? { ...notification, read_at: Date() }
            : notification
        );
        state.notification = action.payload.response.data.data;
      })
      .addCase(readNotification.rejected, handleRejected)

      // deleteNotification
      .addCase(deleteNotification.pending, handlePending)
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.filter(
          (n) => n.id !== action.payload.id
        );
      })
      .addCase(deleteNotification.rejected, handleRejected)

      // readAllNotifications
      .addCase(readAllNotifications.pending, handlePending)
      .addCase(readAllNotifications.fulfilled, (state) => {
        state.loading = false;
        state.notifications = state.notifications.map((notification) => ({
          ...notification,
          read_at: Date(),
        }));
      })
      .addCase(readAllNotifications.rejected, handleRejected);
  },
});

export default notificationsSlice.reducer;
