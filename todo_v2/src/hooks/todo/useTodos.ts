import { useQuery } from "@tanstack/react-query";
import { todoApi } from "../../api/todo/todo.api";

export const useTodos = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: todoApi.getAll
    })
}