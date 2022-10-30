import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesController } from './controllers/categories.controller'
import { CategoryEntity } from './enties/category.entity'
import { CategoryService } from './services/category.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity])
    ],
    providers: [
        CategoryService
    ],
    exports: [
    ],
    controllers: [
        CategoriesController
    ]
})
export class CatalogsModule { }
