import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { ApiList, ApiSingle, ApiMessage } from "../api/apiResponse.types";



interface CrudApi<T> {
    getAll: () => Promise<ApiList<T>>
    getById: (id:number | string) => Promise<ApiSingle<T>>
    create: (data:Partial<T>) => Promise<ApiSingle<T>>
    update: (id:number | string, data:Partial<T>) => Promise<ApiSingle<T>>
    remove: (id:number | string) => Promise<ApiMessage>
}

type UpdateVars<T> = {
  id: number | string;
  data: Partial<T>;
};

export const hookFactory = <T>(queryKey:QueryKey, api:CrudApi<T>) => {
    const queryClient = useQueryClient();
    const uponSuccess = (request_type:string, data:any, success_msg?:string) => {
        queryClient.invalidateQueries({ queryKey })
        if (success_msg) toast.success(success_msg)
        console.log(request_type, data)
    }
    const uponError = (request_type:string, error:any, error_msg:string) => {
        if (error_msg) toast.error(error_msg)
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
    
    const useCreate = () => 
        useMutation<ApiSingle<T>, unknown, Partial<T>>({
            mutationFn: api.create,
            onSuccess: (data) => {
                uponSuccess("POST", data, data.message)
            },
            onError: (error:any) => {
                uponError("POST", error, error.error.message)
            }
        })

    const useUpdate = () => 
        useMutation<ApiSingle<T>, unknown, UpdateVars<T>>({
            mutationFn: ({id, data}:{id:number | string, data:Partial<T>}) => api.update(id, data),
            onSuccess: (data) => {
                uponSuccess("PATCH", data, data.message)
            },
            onError: (error:any) => {
                uponError("PATCH", error, error.error.message)
            }
        })

    const useDelete = () =>
        useMutation<ApiMessage, unknown, number | string>({
            mutationFn: api.remove,
            onSuccess: (data) => {
                uponSuccess("PATCH", data, data.message)
            },
            onError: (error:any) => {
                uponError("PATCH", error, error.error.message)
            }
        })
    
    return {
        useList,
        useById,
        useCreate,
        useUpdate,
        useDelete
    }
}