import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CategoryDto } from '../dtos/category.dto'
import { CategoryService } from '../services/category.service'

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    getCategories() {
        return this.categoryService.findAll()
    }

    @Get(":id")
    getById(@Param('id') id: number) {
        return this.categoryService.findOne(id)
    }

    @Post()
    create(@Body() req: CategoryDto) {
        return this.categoryService.create(req)
    }
}
