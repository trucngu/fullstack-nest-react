import httpClient from '../client/api-client'

type AuthResponse = {
    accessToken: string
}

export const login = async (username: string, password: string) => {
    const res = await httpClient.post<AuthResponse>('/auth/login', {
        username,
        password
    })
    return res.data
}

type ProfileResponse = {
    username: string
}
export const getProfile = async () => {
    const res = await httpClient.get<ProfileResponse>('/auth/profile')
    return res.data
}