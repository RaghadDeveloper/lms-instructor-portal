import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import coursesReducer from "../features/courses/coursesSlice";
import courseDraftReducer from "../features/courses/courseDraftSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    courses: coursesReducer,
    courseDraft: courseDraftReducer,
    lessons: lessonsReducer,
  },
});

export default store;
