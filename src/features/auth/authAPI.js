import axiosInstance from "../../api/axiosInstance";

export const signupAPI = (data) => axiosInstance.post("/register", data);
export const loginAPI = (data) => axiosInstance.post("/login", data);
