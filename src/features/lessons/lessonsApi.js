import axiosInstance from "../../api/axiosInstance";

export const getAllLessonsApi = (courseId) =>
  axiosInstance.get(`/courses/${courseId}/lessons`);

export const getLessonDetailsApi = (lessonId) =>
  axiosInstance.get(`/lesson/details/${lessonId}`);
