import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CategoryDto } from '../dto/category.dto'
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
    create(@Body() categoryDto: CategoryDto) {
        return this.categoryService.create(categoryDto)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() categoryDto: CategoryDto) {
        return this.categoryService.update(id, categoryDto)
    }

    @Put(':id/deactivate')
    deactivate(@Param('id') id: number) {
        return this.categoryService.deactive(id)
    }
}
