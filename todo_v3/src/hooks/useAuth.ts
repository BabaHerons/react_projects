import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth/auth.api";
import type { LoginPayload } from "../api/auth/auth.types";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successfull");
      console.log(data);
      navigate("/todos");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Login Failed");
      console.log("Login Error", error);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: (data) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("Logout Response:", data);
      toast.success(data?.message);
      navigate("/login");
    },
  });
};
