import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../../api/todo/todo.api";
import { toast } from "react-toastify";

export const useTodoMutations = () => {
    const queryClient = useQueryClient()
    const successMsg = (request_type:string, data:any, success_msg:string) => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
        toast.success(success_msg)
        console.log(request_type, data)
    }
    const errorMsg = (request_type:string, error:any, error_msg:string) => {
        toast.error(error_msg)
        console.log(request_type, error)
    }

    const createTodo = useMutation({
        mutationFn: todoApi.post,
        onSuccess: (data) => {
            successMsg('POST', data, "Todo added successfully.")
            // queryClient.invalidateQueries({ queryKey: ['todos'] })
            // toast.success("Todo added successfully.")
            // console.log("Todo POST data:", data)
        },
        onError: (error) => {
            errorMsg('POST', error, "Unable to add Todo.")
            // toast.error("Unable to add Todo.")
            // console.log(error)
        }
    })

    const updateTodo = useMutation({
        mutationFn: ({ id, data }:{ id:number, data:any }) => todoApi.patch(id, data),
        onSuccess: (data) => {
            successMsg("PATCH", data, "Todo updated successfully.")
        },
        onError: (error) => {
            errorMsg("PATCH", error, "Ubable to update Todo.")
        }
    })

    const deleteTodo = useMutation({
        mutationFn: ({ id }: {id:number}) => todoApi.delete(id),
        onSuccess: (data) => {
            successMsg("DELETE", data, "Todo deleted successfully.")
        },
        onError: (error) => {
            errorMsg("DELETE", error, "Unbale to delete Todo.")
        }
    })

    return {
        createTodo,
        updateTodo,
        deleteTodo
    }
}