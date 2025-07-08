import axiosInstance from "../../api/axiosInstance";

export const getAllLessonsApi = (courseId) =>
  axiosInstance.get(`/courses/${courseId}/lessons`);

export const getLessonDetailsApi = (lessonId) =>
  axiosInstance.get(`/lesson/details/${lessonId}`);

export const createLessonApi = (lessonInfo) =>
  axiosInstance.post("/lesson/create", lessonInfo);

export const updateLessonApi = ({ lessonId, lessonInfo }) =>
  axiosInstance.post(`/lesson/update/${lessonId}`, lessonInfo);
