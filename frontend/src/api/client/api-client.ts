import axios from 'axios'
import constants from '../../constants'

const apiClient = axios.create({
    baseURL: 'http://localhost:3000'
})

apiClient.interceptors.request.use(config => {
    const jwt = localStorage.getItem(constants.jwt)
    config!.headers!['Authorization'] = `Bearer ${jwt}`
    return config
}, error => {
    return Promise.reject(error)
})

export default apiClient