import { createSlice } from "@reduxjs/toolkit";
import { getAllLessons, getLessonDetails } from "./lessonsThunk";

const initialState = {
  loading: false,
  error: null,
  lessons: [],
  lesson: null,
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

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    clearError: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllLessons
      .addCase(getAllLessons.pending, handlePending)
      .addCase(getAllLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload.data;
      })
      .addCase(getAllLessons.rejected, handleRejected)

      // getLessonDetails
      .addCase(getLessonDetails.pending, handlePending)
      .addCase(getLessonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload.data;
      })
      .addCase(getLessonDetails.rejected, handleRejected);
  },
});

export const { clearError } = lessonsSlice.actions;
export default lessonsSlice.reducer;
