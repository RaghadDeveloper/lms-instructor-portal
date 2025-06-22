import axiosInstance from "../../api/axiosInstance";

export const getAllCoursesApi = () => axiosInstance.get("/courses");

export const createCourseApi = (data) =>
  axiosInstance.post("/course/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
