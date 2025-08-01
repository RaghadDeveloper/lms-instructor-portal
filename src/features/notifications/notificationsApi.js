import axiosInstance from "../../api/axiosInstance";

export const getAllNotificationsApi = () => axiosInstance.get("/notifications");

export const readNotificationApi = (notificationId) =>
  axiosInstance.post(`/notification/read/${notificationId}`);

export const deleteNotificationApi = (notificationId) =>
  axiosInstance.delete(`/notification/destroy/${notificationId}`);

export const readAllNotificationsApi = () =>
  axiosInstance.post("/notification/markAllAsRead");
