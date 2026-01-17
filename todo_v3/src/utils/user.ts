import type { User } from "../api/user/user.types"

export const getActiveUser = (): User | null => {
    const data = localStorage.getItem('user')
    if (!data) return null
    
    return JSON.parse(data) as User
}
