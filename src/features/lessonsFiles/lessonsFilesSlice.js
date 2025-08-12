import { createSlice } from "@reduxjs/toolkit";
import { getLessonFile } from "./lessonsFilesThunk";

const initialState = {
  loading: false,
  error: null,
  files: [],
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

const lessonFilesSlice = createSlice({
  name: "lessonFiles",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLessonFile.pending, handlePending)
      .addCase(getLessonFile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.files = action.payload.data;
      })
      .addCase(getLessonFile.rejected, handleRejected);
  },
});

export default lessonFilesSlice.reducer;
