import { createSlice } from "@reduxjs/toolkit";
import { createCourse, getAllCourses } from "./courseThunk";

const initialState = {
  loading: false,
  error: null,
  courses: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  extraReducers: (builder) => {
    builder
      // getAllCourses
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createCourse
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "errr";
      });
  },
});

export default courseSlice.reducer;
