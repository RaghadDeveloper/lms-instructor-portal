import axiosInstance from "../../api/axiosInstance";

export const fetchCategoriesApi = () => axiosInstance.get("/categories");
