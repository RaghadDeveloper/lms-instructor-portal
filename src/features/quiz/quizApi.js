import axiosInstance from "../../api/axiosInstance";

export const getQuizApi = (quizApi) => axiosInstance.get(`/quiz/${quizApi}`);
