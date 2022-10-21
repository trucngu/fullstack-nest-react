import httpClient from '../client/api-client'

export const getProducts = async () => {
    const res = await httpClient.get('/products')
    if (res.status == 200) {
        return res.data
    }
    return []
}