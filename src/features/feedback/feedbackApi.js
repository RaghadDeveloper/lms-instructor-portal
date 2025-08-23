import axiosInstance from "../../api/axiosInstance";

export const sendFeedbackApi = (data) =>
  axiosInstance.post("/contact-us", data);
