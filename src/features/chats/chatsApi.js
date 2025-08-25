import axiosInstance from "../../api/axiosInstance";

export const getAllChatApi = () => axiosInstance("/chats");

export const getChatApi = (chatId) =>
  axiosInstance(`/chats/chat?conversation_id=${chatId}`);

export const deleteChatApi = (chatId) =>
  axiosInstance(`/chats/chat/delete/${chatId}`);

export const getUserProfileApi = (userId) =>
  axiosInstance.get(`/users/profile?user_id=${userId}`);

export const sendMessageApi = (message) =>
  axiosInstance.post("/send-message", message);
