import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  getCourses,
  getCourseDetails,
  searchCourses,
  updateCourse,
  searchCourseTitle,
} from "./coursesThunk";

const initialState = {
  loading: false,
  error: null,
  courses: [],
  course: null,
  titles: [],
  pagination: {
    currentPage: 1,
    prev: null,
    next: null,
    pages: [],
  },
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

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCourseError: (state) => {
      state.error = null;
    },
    clearTitles: (state) => {
      state.titles = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // filterCourses
      .addCase(getCourses.pending, handlePending)
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data?.courses;
        state.pagination = {
          currentPage: action.payload.data?.pagination.current_page,
          prev: action.payload.data?.pagination.prev_page,
          next: action.payload.data?.pagination.next_page,
          pages: action.payload.data?.pagination.pages,
        };
      })
      .addCase(getCourses.rejected, handleRejected)

      // searchCoursesTitle
      .addCase(searchCourseTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.titles = action.payload.data;
      })
      .addCase(searchCourseTitle.rejected, handleRejected)

      // searchCourses
      .addCase(searchCourses.pending, handlePending)
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
      })
      .addCase(searchCourses.rejected, handleRejected)

      // getCourseDetails
      .addCase(getCourseDetails.pending, handlePending)
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.data;
      })
      .addCase(getCourseDetails.rejected, handleRejected)

      // createCourse
      .addCase(createCourse.pending, handlePending)
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.data;
        state.courses.unshift(action.payload.data);
      })
      .addCase(createCourse.rejected, handleRejected)

      // updateCourse
      .addCase(updateCourse.pending, handlePending)
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.data;
        state.courses = state.courses.map((course) =>
          course.id === action.payload.data.id ? action.payload.data : course
        );
      })
      .addCase(updateCourse.rejected, handleRejected);
  },
});

export const { clearCourseError, clearTitles } = courseSlice.actions;
export default courseSlice.reducer;
