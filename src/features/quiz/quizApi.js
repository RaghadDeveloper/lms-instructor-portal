import axiosInstance from "../../api/axiosInstance";

export const getQuizApi = (quizApi) => axiosInstance.get(`/quiz/${quizApi}`);

export const createQuizApi = (data) => axiosInstance.post("/quiz/create", data);

export const addQuestionApi = (question) =>
  axiosInstance.post(`/question/add`, question);

export const updateQuestionApi = ({ questionId, question }) =>
  axiosInstance.post(`/question/update/${questionId}`, question);

export const deleteQuestionApi = (questionId) =>
  axiosInstance.delete(`/question/delete/${questionId}`);
