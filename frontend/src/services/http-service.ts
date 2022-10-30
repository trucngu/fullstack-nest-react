import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3000'
})

async function get<T>(url: string) {
    const response = await api.get(url)
    if (response.status === 200) {
        return response.data as T
    }
    return []
}

async function post<T>(url: string, body?: any) {
    const response = await api.post(url, body)
    return response.data as T
}

async function put<T>(url: string, body: T) {
    const response = await api.put(url, body)
    if (response.status === 200) {
        return response.data as T
    }
    return null
}

async function remove(url: string) {
    const response = await api.delete(url)
    if (response.status === 200) {
        return response.data
    }
    return null
}

const httpService = {
    get,
    post,
    put,
    remove
}

export default httpService