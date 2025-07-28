import axiosInstance from "../../api/axiosInstance";

export const getProfileApi = () => axiosInstance.get("/my-profile");

export const getMyFollowersApi = () => axiosInstance.get("/users/my-followers");
