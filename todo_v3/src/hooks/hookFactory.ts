import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import { toast } from "react-toastify";



interface CrudApi<T> {
    getAll: () => Promise<T[]>
    getById: (id:number | string) => Promise<T>
    create: (data:Partial<T>) => Promise<T>
    update: (id:number | string, data:Partial<T>) => Promise<T>
    remove: (id:number | string) => Promise<void>
}

export const hookFactory = <T>(queryKey:QueryKey, api:CrudApi<T>) => {
    const queryClient = useQueryClient();
    const uponSuccess = (request_type:string, data:any, success_msg:string) => {
        queryClient.invalidateQueries({ queryKey })
        toast.success(success_msg)
        console.log(request_type, data)
    }
    const uponError = (request_type:string, error:any, error_msg:string) => {
        toast.error(error_msg)
        console.log(request_type, error)
    }

    const useList = () => 
        useQuery({
            queryKey,
            queryFn: api.getAll,
            select: (data:any) => data?.records
        })

    const useById = (id:number | string) => 
        useQuery({
            queryKey: [...queryKey, id],
            queryFn: () => api.getById(id),
            enabled: !!id,
            select: (data:any) => data.record
        })
    
    const useCreate = () => 
        useMutation({
            mutationFn: api.create,
            onSuccess: (data:any) => {
                uponSuccess("POST", data, data.message)
            },
            onError: (error:any) => {
                uponError("POST", error, error.error.message)
            }
        })

    const useUpdate = () => 
        useMutation({
            mutationFn: ({id, data}:{id:number | string, data:Partial<T>}) => api.update(id, data),
            onSuccess: (data:any) => {
                uponSuccess("PATCH", data, data.message)
            },
            onError: (error:any) => {
                uponError("PATCH", error, error.error.message)
            }
        })

    const useDelete = () =>
        useMutation({
            mutationFn: api.remove,
            onSuccess: (data:any) => {
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