import axiosInstance from "../../api/axiosInstance";

export const getAllCoursesApi = () => axiosInstance.get("/courses");
