import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://192.168.29.51:3000",
    // baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
})

// 🔹 artificial delay for testing
axiosInstance.interceptors.response.use(
  async (response) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 sec delay
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);