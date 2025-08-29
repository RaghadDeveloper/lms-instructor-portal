import { createSlice } from "@reduxjs/toolkit";
import {
  deleteChat,
  deleteMessage,
  getAllChat,
  getChat,
  getUserProfile,
  sendMessage,
  updateMessage,
} from "./chatsThunk";

const initialState = {
  loading: false,
  loadingAllChats: false,
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
      .addCase(getAllChat.pending, (state) => {
        state.loadingAllChats = true;
        state.error = null;
      })
      .addCase(getAllChat.fulfilled, (state, action) => {
        state.loadingAllChats = false;
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
      .addCase(getChat.rejected, handleRejected)

      // deleteChat
      .addCase(deleteChat.pending, handlePending)
      .addCase(deleteChat.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = null;
        // state.chat = action.payload.data;
      })
      .addCase(deleteChat.rejected, handleRejected)

      // sendMessage
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chat.messages.push(action.payload.data);
      })
      .addCase(sendMessage.rejected, handleRejected)

      // updateMessage
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chat.messages = state.chat.messages.map((message) =>
          message.id === action.payload.data.id ? action.payload.data : message
        );
      })
      .addCase(updateMessage.rejected, handleRejected)

      // deleteMessage
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.chat.messages = state.chat.messages.filter(
          (message) => message.id !== action.meta.arg
        );
      })
      .addCase(deleteMessage.rejected, handleRejected);
  },
});

export default chatsSlice.reducer;
