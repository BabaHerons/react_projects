import type { LoginPayload, AuthResponse } from "./auth.types";
import { axiosInstance } from "../axiosInstance";

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const axios = axiosInstance;
    const { data } = await axios.post<AuthResponse>("/login", payload);
    return data;
  },

  logout: async () => {
    const axios = axiosInstance;
    const { data } = await axios.post<{ message: string }>("/logout");
    return data;
  },
};
