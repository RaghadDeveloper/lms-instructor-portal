import axiosInstance from "../../api/axiosInstance";

export const getProfileApi = () => axiosInstance.get("/my-profile");

export const getMyFollowersApi = (page) =>
  axiosInstance.get(`/users/my-followers?page=${page}`);

export const createProfileApi = (data) => axiosInstance.post("/profile", data);

export const storeUserCategoriesApi = (data) =>
  axiosInstance.post("/store", data);

export const updateProfileApi = (data) =>
  axiosInstance.patch("/profile/update_profile", data);
