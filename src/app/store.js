import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import coursesReducer from "../features/courses/coursesSlice";
import courseDraftReducer from "../features/courses/courseDraftSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";
import lessonFilesReducer from "../features/lessonsFiles/lessonsFilesSlice";
import profileReducer from "../features/profile/profileSlice";
import postsReducer from "../features/posts/postsSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import statisticsReducer from "../features/statistics/statisticsSlice";
import quizReducer from "../features/quiz/quizSlice";
import chatsReducer from "../features/chats/chatsSlice";
import usersReducre from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    courses: coursesReducer,
    courseDraft: courseDraftReducer,
    lessons: lessonsReducer,
    lessonFiles: lessonFilesReducer,
    profile: profileReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
    statistics: statisticsReducer,
    quiz: quizReducer,
    chats: chatsReducer,
    users: usersReducre,
  },
});

export default store;
