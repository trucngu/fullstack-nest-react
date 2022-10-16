import { Module } from '@nestjs/common'
import { CategoriesController } from './controllers/categories.controller'
import { ProductsController } from './controllers/products.controller'

@Module({
    controllers: [
        ProductsController,
        CategoriesController
    ],
})
export class CatalogsModule { }
