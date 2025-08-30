import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: "https://learning-system.alllahhham.com/api",
  // baseURL: "https://125a1573d2e8.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
