import { ReactNode } from 'react'
import apiClient from './http-service'

export interface CategoryModel {
    key: ReactNode
    id: number
    name: string
    description?: string
    isActive: boolean
    parent?: any
    children?: CategoryModel[]
}

const categoryService = {
    create: async (category: CategoryModel) => await apiClient.post('/categories', category),
    get: async () => await apiClient.get<CategoryModel[]>('/categories/tree'),
    delete: async (id: number) => await apiClient.remove(`/categories/${id}`)
}

export default categoryService