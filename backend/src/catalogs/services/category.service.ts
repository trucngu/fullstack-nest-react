import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, TreeRepository } from 'typeorm'
import { CategoryDto } from '../dto/category.dto'
import { CategoryEntity } from '../enties/category.entity'

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private repo: Repository<CategoryEntity>,

        @InjectRepository(CategoryEntity)
        private treeRepo: TreeRepository<CategoryEntity>
    ) { }

    async get() {
        return await this.repo.find()
    }

    async getTree() {
        return await this.treeRepo.findTrees()
    }

    async getById(id: number) {
        return this.repo.findOneBy({
            key: id
        })
    }

    async create(dto: CategoryDto): Promise<CategoryEntity> {
        const parent = await this.repo.findOneBy({ key: dto.parentId })
        if (!parent) {
            throw new NotFoundException("Parent category does not exist")
        }

        const result = await this.repo.save({
            parent,
            name: dto.name,
            description: dto.description,
            isActive: true
        })
        return result
    }

    async update(id: number, dto: CategoryDto) {
        await this.repo.update(id, {
            name: dto.name
        })
    }

    async deactive(id: number) {
        await this.repo.update(id, {
            isActive: false
        })
    }

    async remove(id: number) {
        await this.repo.delete(id)
    }
}
