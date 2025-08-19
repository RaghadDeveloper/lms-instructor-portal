import { createSlice } from "@reduxjs/toolkit";
import {
  createLessonComment,
  createLesson,
  getAllLessons,
  getLessonComments,
  getLessonDetails,
  updateLesson,
} from "./lessonsThunk";

const initialState = {
  loading: false,
  error: null,
  lessons: [],
  lesson: null,
  comments: [],
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
      .addCase(getLessonDetails.rejected, handleRejected)

      // createLesson
      .addCase(createLesson.pending, handlePending)
      .addCase(createLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload.data;
        state.lessons.push(action.payload.data);
      })
      .addCase(createLesson.rejected, handleRejected)

      // updateLesson
      .addCase(updateLesson.pending, handlePending)
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload.data;
        state.lessons = state.lessons.map((lesson) =>
          lesson.id === action.payload.data.id ? action.payload.data : lesson
        );
      })
      .addCase(updateLesson.rejected, handleRejected)

      // getLessonComments
      .addCase(getLessonComments.pending, handlePending)
      .addCase(getLessonComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.data;
      })
      .addCase(getLessonComments.rejected, handleRejected)

      // createComment
      .addCase(createLessonComment.fulfilled, (state, action) => {
        state.loading = false;

        const commentData = action.payload.data;

        if (action.payload.data.comment_parent_id) {
          const parentCommentId = commentData.comment_parent_id;

          const parentComment = state.comments.find(
            (comment) => comment.id === parentCommentId
          );

          if (parentComment) {
            if (!Array.isArray(parentComment.replies)) {
              parentComment.replies = [];
            }

            parentComment.replies.push(commentData);
          }
        } else {
          state.comments.unshift(commentData);
          state.lesson.comment_count++;
        }
      })
      .addCase(createLessonComment.rejected, handleRejected);
  },
});

export const { clearError } = lessonsSlice.actions;
export default lessonsSlice.reducer;
