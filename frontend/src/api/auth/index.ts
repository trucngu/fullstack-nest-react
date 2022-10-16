import { api } from '../api-client'
import { LoginResult } from './login-result'

export const login = async (username: string, password: string) => {
    const res = await api.post<LoginResult>('/auth/login', {
        username,
        password
    })
    return res.data
}