import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoriesApi } from "./categoriesApi";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await fetchCategoriesApi();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || {
          message: "An unexpected error occurred. Please try again.",
        }
      );
    }
  }
);
