import axiosInstance from "../../api/axiosInstance";

export const getAllProfilesApi = (filters) => {
  const params = new URLSearchParams(filters).toString();
  return axiosInstance.get(`/profiles?${params}`);
};
