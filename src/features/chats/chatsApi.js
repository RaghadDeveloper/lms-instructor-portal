import axiosInstance from "../../api/axiosInstance";

export const getAllChatApi = () => axiosInstance("/chats");

export const getChatApi = (chatId) =>
  axiosInstance(`/chats/chat?conversation_id=${chatId}`);

export const deleteChatApi = (chatId) =>
  axiosInstance.delete(`/chats/chat/delete`, chatId);

export const getUserProfileApi = (userId) =>
  axiosInstance.get(`/users/profile?user_id=${userId}`);

export const sendMessageApi = (message) =>
  axiosInstance.post("/send-message", message);

export const updateMessageApi = (message) =>
  axiosInstance.patch("/message/update", message);

export const deleteMessageApi = (messageId) =>
  axiosInstance.delete(`/message/delete?message_id=${messageId}`);
