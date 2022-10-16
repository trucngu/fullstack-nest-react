import { api } from './api-client'

export const getProducts = async () => {
    const res = await api.get('/products')
    if (res.status == 200) {
        return res.data
    }
    return []
}