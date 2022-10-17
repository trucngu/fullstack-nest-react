import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryDto } from '../dtos/category.dto'
import { ProductDto } from '../dtos/product.dto'
import { Category } from '../enties/category.entity'

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private cateogryRepository: Repository<Category>
    ) { }

    async findAll() {
        return this.cateogryRepository.find()
    }

    async findOne(id: number) {
        return this.cateogryRepository.findOneBy({
            id
        })
    }

    async create(dto: CategoryDto): Promise<Category> {
        const result = await this.cateogryRepository.save({
            name: dto.name,
            isActive: true
        })
        return result
    }
}
