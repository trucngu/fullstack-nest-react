import { login } from './auth'
import { getProducts } from './product'

const apiClient = {
    //Auth
    login,

    //Products Management
    getProducts
}

export default apiClient