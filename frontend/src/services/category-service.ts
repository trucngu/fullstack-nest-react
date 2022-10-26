import apiClient from './http-service'

export interface CategoryModel {
    key: number
    name: string
    description?: string
    isActive: boolean
    parent?: any
    parentId?: number,
    children?: CategoryModel[]
}

const get = async () => await apiClient.get<CategoryModel[]>('/categories/tree')

const getById = async (id: number) => await apiClient.get<CategoryModel>(`/categories/${id}`)

const create = async (category: CategoryModel) => await apiClient.post('/categories', category)

const remove = async (id: number) => await apiClient.remove(`/categories/${id}`)

const update = async (id: number, category: CategoryModel) => await apiClient.put(`/categories/${id}`, category)

const categoryService = {
    create,
    get,
    getById,
    remove,
    update
}

export default categoryService
