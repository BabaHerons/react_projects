import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://192.168.29.51:3000",
    // baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
})