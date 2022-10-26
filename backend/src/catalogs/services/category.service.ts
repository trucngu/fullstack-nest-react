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
        const category = await this.treeRepo.findOneBy({ key: id })
        return await this.treeRepo.findAncestorsTree(category)
    }

    async create(dto: CategoryDto): Promise<CategoryEntity> {
        try {
            const entity: CategoryEntity = {
                name: dto.name,
                description: dto.description,
                isActive: true,
            }

            if (dto.parentId) {
                const parent = await this.repo.findOneBy({ key: dto.parentId })
                if (!parent) {
                    throw new NotFoundException("Parent category does not exist")
                }
                entity.parent = parent
            }

            const result = await this.repo.save(entity)
            return result
        }
        catch (e) {
            console.log(e)
        }
    }

    async update(id: number, dto: CategoryDto) {
        const parent = dto.parentId ? await this.getById(dto.parentId) : null
        await this.repo.update(id, {
            name: dto.name,
            description: dto.description,
            parent,
            isActive: dto.isActive
        })
    }

    async deactive(id: number) {
        await this.repo.update(id, {
            isActive: false
        })
    }

    async remove(id: number) {
        const entity = await this.getById(id)
        await this.treeRepo.remove(entity)
    }
}
