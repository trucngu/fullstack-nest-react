import apiClient from './http-service'

export type SelectOption = {
    id: any
    text: string
}

type AuthResponse = {
    accessToken: string
}

type ProfileResponse = {
    username: string
}

const getSelectOptions = async (resource: string, keyField: string = 'id', valueField: string = 'text'): Promise<SelectOption[]> => {
    const data = await apiClient.get<any[]>(resource)
    return data.map((item: any) => ({
        id: item[keyField],
        text: item[valueField]
    } as SelectOption))
}

const getProducts = async () => await apiClient.get<any[]>('/products')


const login = async (username: string, password: string) =>
    await apiClient.post<AuthResponse>('/auth/login', {
        username,
        password
    })


const getProfile = async () => await apiClient.get<ProfileResponse>('/auth/profile')

export default {
    getSelectOptions,
    getProducts,
    login,
    getProfile
}