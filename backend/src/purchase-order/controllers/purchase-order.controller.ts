import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PurchaseOrderService } from '../services/purchase-order.service'
import { CreatePurchaseOrderDto } from '../dto/create-purchase-order.dto'
import { UpdatePurchaseOrderDto } from '../dto/update-purchase-order.dto'

@Controller('purchase-orders')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) { }

  @Post()
  create(@Body() dto: CreatePurchaseOrderDto) {
    return this.purchaseOrderService.create(dto)
  }

  @Get()
  findAll() {
    return this.purchaseOrderService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePurchaseOrderDto) {
    return this.purchaseOrderService.update(+id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderService.remove(+id)
  }
}
