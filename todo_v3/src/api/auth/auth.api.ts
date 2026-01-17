import type { LoginPayload, AuthResponse, SignupPayload } from "./auth.types";
import { axiosInstance } from "../axiosInstance";
import type { ApiSingle } from "../apiResponse.types";
import type { User } from "../user/user.types";

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

  signup: async (payload: SignupPayload): Promise<ApiSingle<User>> => {
    const axios = axiosInstance
    const { data } = await axios.post<ApiSingle<User>>("/users", payload);
    return data
  }
};
