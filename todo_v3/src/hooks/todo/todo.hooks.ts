import { hookFactory } from "../hookFactory";
import { todoApi } from "../../api/todo/todo.api";
import type { Todo } from "../../api/todo/todo.types";

export const todoHooks = hookFactory<Todo>(['todos'], todoApi)