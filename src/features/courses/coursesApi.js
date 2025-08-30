import axiosInstance from "../../api/axiosInstance";

export const getCoursesApi = (filters) => {
  const params = new URLSearchParams(filters).toString();
  return axiosInstance.get(`/courses?${params}`);
};

export const searchCourseTitleApi = (search_key) =>
  axiosInstance.get(`/course/title/search?search_key=${search_key}`);

export const searchCoursesApi = (search_key) =>
  axiosInstance.get(`course/search?search_key=${search_key}`);

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

export const deleteCourseApi = (courseId) =>
  axiosInstance.delete(`/course/${courseId}`);
