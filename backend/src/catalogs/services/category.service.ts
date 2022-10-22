import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Entity, Repository } from 'typeorm'
import { CategoryDto } from '../dto/category.dto'
import { CategoryEntity } from '../enties/category.entity'

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>
    ) { }

    async findAll() {
        return (await this.categoryRepo.find()).map(entity => {
            return {
                ...entity,
                children: entity.children
            }
        })
    }

    async findOne(id: number) {
        return this.categoryRepo.findOneBy({
            id
        })
    }

    async create(dto: CategoryDto): Promise<CategoryEntity> {
        const parent = await this.categoryRepo.findOneBy({ id: dto.parentId })
        if (!parent) {
            throw new NotFoundException("Parent category does not exist")
        }

        const result = await this.categoryRepo.save({
            parent,
            name: dto.name,
            description: dto.description,
            isActive: true
        })
        return result
    }

    async update(id: number, dto: CategoryDto) {
        await this.categoryRepo.update(id, {
            name: dto.name
        })
    }

    async deactive(id: number) {
        await this.categoryRepo.update(id, {
            isActive: false
        })
    }

    async remove(id: number) {
        await this.categoryRepo.delete(id)
    }
}
