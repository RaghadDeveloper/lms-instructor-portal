import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse,
} from "./courseThunk";

const initialState = {
  loading: false,
  error: null,
  courses: [],
  course: null,
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

      // getCourseDetails
      .addCase(getCourseDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.data;
      })
      .addCase(getCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createCourse
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload.data);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "errr";
      })

      // updateCourse
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.map((course) =>
          course._id === action.payload.data._id ? action.payload.data : course
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "errr";
      });
  },
});

export default courseSlice.reducer;
