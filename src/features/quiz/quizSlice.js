import { createSlice } from "@reduxjs/toolkit";
import { getQuiz } from "./quizThunk";

const initialState = {
  loading: false,
  error: null,
  quiz: null,
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

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  extraReducers: (builder) => {
    builder

      // getQuiz
      .addCase(getQuiz.pending, handlePending)
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quiz = action.payload.data;
      })
      .addCase(getQuiz.rejected, handleRejected);
  },
});

export default quizSlice.reducer;
