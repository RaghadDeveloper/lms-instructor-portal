import axiosInstance from "../../api/axiosInstance";

export const coursesStatisticsApi = (year) =>
  axiosInstance.get(`/teacher/course/statistics?year=${year}`);

export const lessonsStatisticsApi = (year) =>
  axiosInstance.get(`/teacher/lesson/statistics?year=${year}`);

export const followsStatisticsApi = (year) =>
  axiosInstance.get(`/teacher/lesson/statistics?year=${year}`);

export const earningsStatisticsApi = (year) =>
  axiosInstance.get(`/teacher/lesson/statistics?year=${year}`);
