import axiosInstance from "../../api/axiosInstance";

export const getProfileApi = () => axiosInstance.get("/my-profile");

export const getMyFollowersApi = () => axiosInstance.get("/users/my-followers");

export const createProfileApi = (data) => axiosInstance.post("/profile", data);

export const storeUserCategoriesApi = (data) =>
  axiosInstance.post("/store", data);
