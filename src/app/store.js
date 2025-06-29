import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import coursesReducer from "../features/courses/coursesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    courses: coursesReducer,
  },
});

export default store;
