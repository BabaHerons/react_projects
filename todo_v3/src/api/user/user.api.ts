import { axiosInstance } from "../axiosInstance";
import { crudFactory } from "../crudFactory";
import type { User } from "./user.types";

export const userApi = crudFactory<User>(axiosInstance, "/users")