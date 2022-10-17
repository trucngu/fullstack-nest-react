import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesController } from './controllers/categories.controller'
import { ProductsController } from './controllers/products.controller'
import { Category } from './enties/category.entity'
import { CategoryService } from './services/category.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Category])
    ],
    providers: [
        CategoryService
    ],
    exports: [
    ],
    controllers: [
        ProductsController,
        CategoriesController
    ]
})
export class CatalogsModule { }
