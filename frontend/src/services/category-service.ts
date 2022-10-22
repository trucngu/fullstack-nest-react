import apiClient from './http-service'

export interface Category {
    id: number
    name: string
    description?: string
    isActive: boolean
    parent?: any
    children?: Category[]
}

const categoryService = {
    create: async (category: Category) => await apiClient.post('/categories', category),
    get: async () => {
        const categories = await apiClient.get<Category[]>('/categories')

        return categories
    },
    delete: async (id: number) => await apiClient.remove(`/categories/${id}`)
}

export default categoryService