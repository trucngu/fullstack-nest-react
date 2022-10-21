import { httpClient } from '../client/api-client'
import { LoginResult } from './login-result'

export const login = async (username: string, password: string) => {
    const res = await httpClient.post<LoginResult>('/auth/login', {
        username,
        password
    })
    httpClient.defaults.headers.common = {
        'Authorization': `Bearer ${res.data.accessToken}`
    }
    return res.data
}

export const getProfile = async () => {
    const res = await httpClient.get('/profile')
    return res.data
}