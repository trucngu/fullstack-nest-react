import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CreateSupplierDto } from '../dto/create-supplier.dto'
import { UpdateSupplierDto } from '../dto/update-supplier.dto'
import { Supplier } from '../entities/supplier.entity'

@Injectable()
export class SupplierService {

    constructor(private readonly supplierRepository: Repository<Supplier>) { }

    async findAll() {
        const suppliers = this.supplierRepository.find()
        return suppliers
    }

    async findOne(id: number) {
        const supplier = await this.supplierRepository.findOneBy({ id })
        return supplier
    }

    async create(dto: CreateSupplierDto) {
        await this.supplierRepository.create({
            name: dto.name,
            code: dto.code,
            email: dto.email,
            phone: dto.phone,
            addressLine1: dto.addressLine1,
            addressLine2: dto.addressLine2,
            addressLine3: dto.addressLine3,
            addressLine4: dto.addressLine4,
            addressLine5: dto.addressLine5
        })
    }

    async update(id: number, dto: UpdateSupplierDto) {
        const supplier = await this.supplierRepository.findOneBy({ id })
        if (!supplier) {
            throw new NotFoundException()
        }

        supplier.code = dto.code
        supplier.name = dto.name
        supplier.email = dto.email
        supplier.phone = dto.phone
        supplier.addressLine1 = dto.addressLine1
        supplier.addressLine2 = dto.addressLine2
        supplier.addressLine3 = dto.addressLine3
        supplier.addressLine4 = dto.addressLine4
        supplier.addressLine5 = dto.addressLine5

        await this.supplierRepository.update(id, supplier)
    }
}