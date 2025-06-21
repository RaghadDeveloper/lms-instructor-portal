import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import courseReducer from "../features/course/courseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    course: courseReducer,
  },
});

export default store;
