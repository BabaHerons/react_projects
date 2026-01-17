import type { User } from "../user/user.types";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SignupPayload {
  name: string;
  username: string;
  password: string;
  email: string;
  mob: string;
  address: string;
}