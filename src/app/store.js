import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import courseReducer from "../features/course/courseSlice";
import coursesReducer from "../features/courses/coursesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    course: courseReducer,
    courses: coursesReducer,
  },
});

export default store;
