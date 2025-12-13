import type { AxiosInstance } from "axios";


export const crudFactory = <T>(axios: AxiosInstance, endpoint:string) => ({
    getAll: async (): Promise<T[]> => {
        const { data } = await axios.get<T[]>(endpoint)
        return data
    },

    getById: async (id:number): Promise<T> => {
        const { data } = await axios.get<T>(`${endpoint}/${id}`)
        return data
    },

    post: async (payload: Partial<T>): Promise<Partial<T>> => {
        const { data } = await axios.post<T>(endpoint, payload)
        return data
    },

    patch: async (id:number, payload: Partial<T>): Promise<T> => {
        const { data } = await axios.patch<T>(`${endpoint}/${id}`, payload)
        return data
    },

    delete: async (id:number): Promise<void> => {
        await axios.delete(`${endpoint}/${id}`)
    }
})
