import axiosInstance from "../../api/axiosInstance";

export const getAllLessonsApi = (courseId) =>
  axiosInstance.get(`/courses/${courseId}/lessons`);

export const getLessonDetailsApi = (lessonId) =>
  axiosInstance.get(`/lesson/details/${lessonId}`);

export const createLessonApi = (lessonInfo) =>
  axiosInstance.post("/lesson/create", lessonInfo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateLessonApi = ({ lessonId, lessonInfo }) =>
  axiosInstance.post(`/lesson/update/${lessonId}`, lessonInfo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getLessonCommentsApi = (lessonId) =>
  axiosInstance.get(
    `/all-comments?commentable_id=${lessonId}&commentable_type=lesson`
  );

export const createLessonCommentApi = (data) =>
  axiosInstance.post("/comments", data);

export const updateLessonCommentApi = (data) =>
  axiosInstance.patch("/comments/update", data);

export const deleteLessonCommentApi = (commentId) =>
  axiosInstance.delete(`/comments/delete?comment_id=${commentId}`);
