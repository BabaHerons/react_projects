import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { ApiList, ApiSingle, ApiMessage } from "../api/apiResponse.types";
import type { AxiosError } from "axios";



interface CrudApi<T> {
    getAll: () => Promise<ApiList<T>>
    getById: (id:number | string) => Promise<ApiSingle<T>>
    create: (data:Partial<T>) => Promise<ApiSingle<T>>
    update: (id:number | string, data:Partial<T>) => Promise<ApiSingle<T>>
    remove: (id:number | string) => Promise<ApiMessage>
}

export const hookFactory = <T>(queryKey:QueryKey, api:CrudApi<T>) => {
    const uponSuccess = (request_type:string, data:any, success_msg?:string) => {
        if (success_msg) toast.success(success_msg)
        console.log(request_type, data)
    }
    const uponError = (request_type:string, error:AxiosError<{message:string}>) => {
        if (error) toast.error(error?.response?.data?.message)
        console.log(request_type, error)
    }

    const useList = () => 
        useQuery<ApiList<T>, unknown, T[]>({
            queryKey,
            queryFn: api.getAll,
            select: (data) => data?.records
        })

    const useById = (id:number | string) => 
        useQuery<ApiSingle<T>, unknown, T>({
            queryKey: [...queryKey, id],
            queryFn: () => api.getById(id),
            enabled: !!id,
            select: (data) => data.record
        })
    
    const useCreate = () => {
        const queryClient = useQueryClient();
        
        return useMutation<ApiSingle<T>, AxiosError<{message:string}>, Partial<T>>({
            mutationFn: api.create,
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey });
                uponSuccess("POST", data, data.message)
            },
            onError: (error) => {
                uponError("POST", error)
            }
        })
    }

    const useUpdate = () => {
        const queryClient = useQueryClient();
        
        return useMutation<ApiSingle<T>, AxiosError<{message:string}>, {id:number | string, data:Partial<T>}>({
            mutationFn: ({id, data}) => api.update(id, data),
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey });
                uponSuccess("PATCH", data, "Updated")
            },
            onError: (error) => {
                uponError("PATCH", error)
            }
        })
    }

    const useDelete = () => {
        const queryClient = useQueryClient();
        
        return useMutation<ApiMessage, AxiosError<{message:string}>, number | string>({
            mutationFn: api.remove,
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey });
                uponSuccess("PATCH", data, "Deleted")
            },
            onError: (error) => {
                uponError("PATCH", error)
            }
        })
    }
    
    return {
        useList,
        useById,
        useCreate,
        useUpdate,
        useDelete
    }
}