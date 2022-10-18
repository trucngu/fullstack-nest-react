import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto'
import { UpdatePurchaseOrderDto } from '../dto/update-purchase-order.dto'
import { PurchaseOrder } from '../entities/purchase-order.entity'
import { Supplier } from '../entities/supplier.entity'

@Injectable()
export class PurchaseOrderService {

  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,

    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>
  ) {

  }

  async create(dto: CreatePurchaseOrderDto) {

    const supplier = await this.supplierRepository.findOneBy({ id: dto.supplierId })
    if (!supplier) {
      throw new BadRequestException()
    }

    await this.purchaseOrderRepository.create({
      productName: dto.name,
      quantity: dto.quantity,
      supplier: supplier,
      shippingAddress: dto.shippingAddress,
      unitPrice: dto.unitPrice
    })
  }

  async findAll() {
    const pos = await this.purchaseOrderRepository.find({
      loadEagerRelations: true
    })
    return pos
  }

  async findOne(id: number) {
    const po = await this.purchaseOrderRepository.findOneBy({ id })
    return po
  }

  async update(id: number, dto: UpdatePurchaseOrderDto) {
    const po = await this.findOne(id)
    if (!po) {
      throw new NotFoundException()
    }

    const supplier = await this.supplierRepository.findOneBy({ id: dto.supplierId })

    po.productName = dto.name
    po.quantity = dto.quantity
    po.shippingAddress = dto.shippingAddress
    po.unitPrice = dto.unitPrice
    po.supplier = supplier

    await this.purchaseOrderRepository.update(id, po)
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseOrder`
  }
}
