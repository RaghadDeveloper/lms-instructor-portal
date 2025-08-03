import { createSlice } from "@reduxjs/toolkit";
import {
  coursesStatistics,
  earningsStatistics,
  followsStatistics,
  lessonsStatistics,
} from "./statisticsThunk";

const initialState = {
  loading: false,
  error: null,
  courses: [],
  lessons: [],
  follows: [],
  earnings: [],
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

const statisticsSlice = createSlice({
  name: "courses",
  initialState,
  extraReducers: (builder) => {
    builder

      // coursesStatistics
      .addCase(coursesStatistics.pending, handlePending)
      .addCase(coursesStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
      })
      .addCase(coursesStatistics.rejected, handleRejected)

      // lessonsStatistics
      .addCase(lessonsStatistics.pending, handlePending)
      .addCase(lessonsStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload.data;
      })
      .addCase(lessonsStatistics.rejected, handleRejected)

      // followsStatistics
      .addCase(followsStatistics.pending, handlePending)
      .addCase(followsStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.follows = action.payload.data;
      })
      .addCase(followsStatistics.rejected, handleRejected)

      // earningsStatistics
      .addCase(earningsStatistics.pending, handlePending)
      .addCase(earningsStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.earnings = action.payload.data;
      })
      .addCase(earningsStatistics.rejected, handleRejected);
  },
});

export default statisticsSlice.reducer;
