import apiClient from './http-service'

export interface CategoryModel {
    key: number
    name: string
    description?: string
    isActive: boolean
    parent?: any
    children?: CategoryModel[]
}

const get = async () => await apiClient.get<CategoryModel[]>('/categories/tree')

const loadCategory = (result: CategoryModel[], categories: CategoryModel[]) => {
    for (const cat of categories) {
        result.push(cat)
        if (cat.children?.length ?? 0 > 0) {
            loadCategory(result, cat.children!)
        }
    }
}

const create = async (category: CategoryModel) => await apiClient.post('/categories', category)

const remove = async (id: number) => await apiClient.remove(`/categories/${id}`)

const categoryService = {
    create,
    get,
    remove
}

export default categoryService
