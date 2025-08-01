import axiosInstance from "../../api/axiosInstance";

export const getAllNotificationsApi = () => axiosInstance.get("/notifications");
