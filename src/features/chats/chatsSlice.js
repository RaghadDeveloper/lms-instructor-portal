import { createSlice } from "@reduxjs/toolkit";
import { getAllChat, getChat, getUserProfile } from "./chatsThunk";

const initialState = {
  loading: false,
  error: null,
  chats: [],
  chat: null,
  user: null,
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

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  extraReducers: (builder) => {
    builder

      // getUserProfile
      .addCase(getUserProfile.pending, handlePending)
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.data.profile;
      })
      .addCase(getUserProfile.rejected, handleRejected)

      // getAllChats
      .addCase(getAllChat.pending, handlePending)
      .addCase(getAllChat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chats = action.payload.data;
      })
      .addCase(getAllChat.rejected, handleRejected)

      // getChat
      .addCase(getChat.pending, handlePending)
      .addCase(getChat.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chat = action.payload.data;
      })
      .addCase(getChat.rejected, handleRejected);
  },
});

export default chatsSlice.reducer;
