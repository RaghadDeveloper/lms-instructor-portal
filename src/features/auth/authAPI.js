import axiosInstance from "../../api/axiosInstance";

export const signupAPI = (data) =>
  axiosInstance.post("/teacher/register", data);

export const loginAPI = (data) => axiosInstance.post("/teacher/login", data);

export const verificationAPI = (data) =>
  axiosInstance.post("/email/verification", data);

export const resendOTPAPI = () => axiosInstance.get("/resend/verificationCode");

export const forgotPasswordAPI = (data) =>
  axiosInstance.post("/forgetPassword", data);

export const resetPasswordAPI = (data) =>
  axiosInstance.post("/reset/password", data);

export const logoutAPI = () => axiosInstance.post("/logout");
