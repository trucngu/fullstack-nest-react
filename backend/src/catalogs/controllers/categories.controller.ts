import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CategoryDto } from '../dto/category.dto'
import { CategoryService } from '../services/category.service'

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    getCategories() {
        return this.categoryService.get()
    }

    @Get("tree")
    getCategoriesTree() {
        return this.categoryService.getTree()
    }

    @Get(":id")
    getById(@Param('id') id: number) {
        return this.categoryService.getById(id)
    }

    @Post()
    create(@Body() dto: CategoryDto) {
        return this.categoryService.create(dto)
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() categoryDto: CategoryDto) {
        return this.categoryService.update(id, categoryDto)
    }

    @Put(':id/deactivate')
    deactivate(@Param('id') id: number) {
        return this.categoryService.deactive(id)
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.categoryService.remove(id)
    }
}
