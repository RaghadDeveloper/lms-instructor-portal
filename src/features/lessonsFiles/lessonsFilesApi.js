import axiosInstance from "../../api/axiosInstance";

export const getLessonFilesApi = (lessonId) =>
  axiosInstance.get(`/lesson/pdfs?lesson_id=${lessonId}`);

export const uploadFileApi = (file) => axiosInstance.post("/add-pdf", file);

export const deleteFileApi = (fileId) =>
  axiosInstance.delete(`/delete-pdf?lesson_pdf_id=${fileId}`);
