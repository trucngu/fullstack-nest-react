import { Module } from '@nestjs/common'
import { PurchaseOrderService } from './services/purchase-order.service'
import { PurchaseOrderController } from './controllers/purchase-order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PurchaseOrder } from './entities/purchase-order.entity'
import { Supplier } from './entities/supplier.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrder,
      Supplier
    ])
  ],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService]
})
export class PurchaseOrderModule { }
