import axios from "axios"
import { buildHeaders } from "./buildHeaders";

export const axiosInstance = axios.create({
    // baseURL: "http://192.168.29.51:5000",
    baseURL: "https://babaherons.in/api/todo-v3",
    headers: {
        "Content-Type": "application/json"
    }
})

// 🔹 artificial delay for testing
// axiosInstance.interceptors.response.use(
//   async (response) => {
//     await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 sec delay
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

/* ===============================
   REQUEST INTERCEPTOR
================================ */
axiosInstance.interceptors.request.use(
  (config:any) => {
    const isJsonRequest =
      ["post", "put", "patch"].includes(config.method || "");

    config.headers = {
      ...config.headers,
      ...buildHeaders(isJsonRequest),
    };

    return config;
  },
  (error) => Promise.reject(error)
);