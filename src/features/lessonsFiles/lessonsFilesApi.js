import axiosInstance from "../../api/axiosInstance";

export const getLessonFilesApi = (lessonId) =>
  axiosInstance.get(`/lesson/pdfs?lesson_id=${lessonId}`);
