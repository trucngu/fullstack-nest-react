import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateSupplierDto } from '../dto/create-supplier.dto'
import { UpdateSupplierDto } from '../dto/update-supplier.dto'
import { SupplierService } from '../services/supplier.service'

@Controller('suppliers')
export class SupplierController {

    constructor(private readonly supplierService: SupplierService) { }

    @Post()
    create(@Body() dto: CreateSupplierDto) {
        return this.supplierService.create(dto)
    }

    @Get()
    findAll() {
        return this.supplierService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.supplierService.findOne(+id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
        return this.supplierService.update(+id, dto)
    }
}