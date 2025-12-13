import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: ((value: unknown) => void)[] = [];

const refreshToken = async () => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshSubscribers.push(resolve);
    });
  }

  isRefreshing = true;
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, {
      refreshToken: localStorage.getItem("refresh_token"),
    });
    const newToken = response.data.accessToken;
    localStorage.setItem("access_token", newToken);
    isRefreshing = false;
    refreshSubscribers.forEach((resolve) => resolve(newToken));
    refreshSubscribers = [];
    return newToken;
  } catch (error) {
    isRefreshing = false;
    refreshSubscribers = [];
    throw error;
  }
};

apiClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;