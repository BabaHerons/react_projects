import type { AxiosInstance } from "axios";
import type { ApiSingle, ApiList, ApiMessage } from "./apiResponse.types";

export const crudFactory = <T>(axios: AxiosInstance, endpoint:string) => ({
    getAll: async (): Promise<ApiList<T>> => {
        const { data } = await axios.get<ApiList<T>>(endpoint)
        return data
    },

    getById: async (id:number | string): Promise<ApiSingle<T>> => {
        const { data } = await axios.get<ApiSingle<T>>(`${endpoint}/${id}`)
        return data
    },

    create: async (payload: Partial<T>): Promise<ApiSingle<T>> => {
        const { data } = await axios.post<ApiSingle<T>>(endpoint, payload)
        return data
    },

    update: async (id:number | string, payload: Partial<T>): Promise<ApiSingle<T>> => {
        const { data } = await axios.patch<ApiSingle<T>>(`${endpoint}/${id}`, payload)
        return data
    },

    remove: async (id:number | string): Promise<ApiMessage> => {
        const { data } = await axios.delete<ApiMessage>(`${endpoint}/${id}`)
        return data
    }
})