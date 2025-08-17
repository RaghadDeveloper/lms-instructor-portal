import axiosInstance from "../../api/axiosInstance";

export const coursesStatisticsApi = (year) =>
  axiosInstance.get(`/course/statistics?year=${year}`);

export const lessonsStatisticsApi = (year) =>
  axiosInstance.get(`/lesson/statistics?year=${year}`);

export const followsStatisticsApi = (year) =>
  axiosInstance.get(`/teacher/follow/statistics?year=${year}`);

export const earningsStatisticsApi = (year) =>
  axiosInstance.get(`/earning/statistics?year=${year}`);
