import axiosInstance from "../../api/axiosInstance";

export const getAllCoursesApi = () => axiosInstance.get("/courses");

export const getCourseDetailsApi = (courseId) =>
  axiosInstance.get(`/course/details/${courseId}`);

export const createCourseApi = (data) =>
  axiosInstance.post("/course/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateCourseApi = ({ courseId, courseInfo }) =>
  axiosInstance.post(`/course/update/${courseId}`, courseInfo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
