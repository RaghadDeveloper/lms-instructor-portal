import axiosInstance from "../../api/axiosInstance";

export const createPostApi = (data) => axiosInstance.post("/posts", data);
