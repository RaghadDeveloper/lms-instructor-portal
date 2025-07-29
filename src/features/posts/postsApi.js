import axiosInstance from "../../api/axiosInstance";

export const getAllPostsApi = (user_id, page = 1) =>
  axiosInstance.get(`/teacher/posts?user_id=${user_id}&page=${page}`);

export const createPostApi = (data) => axiosInstance.post("/posts", data);
