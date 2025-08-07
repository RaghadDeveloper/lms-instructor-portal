import { createSlice } from "@reduxjs/toolkit";
import {
  createQuiz,
  deleteQuestion,
  getQuiz,
  updateQuestion,
} from "./quizThunk";

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
      .addCase(getQuiz.rejected, handleRejected)

      // getQuiz
      .addCase(createQuiz.pending, handlePending)
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quiz = action.payload.data;
      })
      .addCase(createQuiz.rejected, handleRejected)

      // updateQuestion
      .addCase(updateQuestion.pending, handlePending)
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quiz = action.payload.data;
      })
      .addCase(updateQuestion.rejected, handleRejected)

      // deleteQuestion
      .addCase(deleteQuestion.pending, handlePending)
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quiz.questions = state.quiz.questions.filter(
          (question) => question.question_id !== action.meta.arg
        );
      })
      .addCase(deleteQuestion.rejected, handleRejected);
  },
});

export default quizSlice.reducer;
