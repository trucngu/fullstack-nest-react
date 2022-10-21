import { login, getProfile } from './auth'
import { getProducts } from './product'

const api = {
    //Auth
    login,
    getProfile,

    //Products Management
    getProducts
}

export default api