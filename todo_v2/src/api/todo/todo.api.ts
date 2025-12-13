import { axiosInstance } from "../axiosInstance";
import { crudFactory } from "../crudFactory";
import type { Todo } from "./todo.types";

export const todoApi = crudFactory<Todo>(axiosInstance, "/todo")