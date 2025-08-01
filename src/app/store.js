import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import coursesReducer from "../features/courses/coursesSlice";
import courseDraftReducer from "../features/courses/courseDraftSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";
import profileReducer from "../features/profile/profileSlice";
import postsReducer from "../features/posts/postsSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    courses: coursesReducer,
    courseDraft: courseDraftReducer,
    lessons: lessonsReducer,
    profile: profileReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
  },
});

export default store;
