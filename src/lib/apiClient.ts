import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});



apiClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

    console.log('Interceptor called');
  const t = localStorage.getItem("access_token");
  console.log('Token:', t);

  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default apiClient;
