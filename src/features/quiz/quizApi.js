import axiosInstance from "../../api/axiosInstance";

export const getQuizApi = (quizApi) => axiosInstance.get(`/quiz/${quizApi}`);

export const createQuizApi = (data) => axiosInstance.post("/quiz/create", data);
