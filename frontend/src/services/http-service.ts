import axios from 'axios'
import constants from '../constants'

export const api = axios.create({
    baseURL: 'http://localhost:3000'
})

api.interceptors.request.use(config => {
    const jwt = localStorage.getItem(constants.jwt)
    config!.headers!['Authorization'] = `Bearer ${jwt}`
    return config
}, error => {
    return Promise.reject(error)
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