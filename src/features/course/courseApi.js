import axiosInstance from "../../api/axiosInstance";

export const createCourseApi = (data) =>
  axiosInstance.post("/course/create", data);
