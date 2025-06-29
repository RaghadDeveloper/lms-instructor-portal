import { createSlice } from "@reduxjs/toolkit";
import {
  createCourse,
  getAllCourses,
  getCourseDetails,
  searchCourses,
  updateCourse,
} from "./coursesThunk";

const initialState = {
  loading: false,
  error: null,
  courses: [],
  course: null,
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
  },
  extraReducers: (builder) => {
    builder
      // getAllCourses
      .addCase(getAllCourses.pending, handlePending)
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
      })
      .addCase(getAllCourses.rejected, handleRejected)

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

export const { clearCourseError } = courseSlice.actions;
export default courseSlice.reducer;
