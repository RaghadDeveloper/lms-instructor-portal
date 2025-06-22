import axiosInstance from "../../api/axiosInstance";

export const createCourseApi = (data) =>
  axiosInstance.post("/course/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
