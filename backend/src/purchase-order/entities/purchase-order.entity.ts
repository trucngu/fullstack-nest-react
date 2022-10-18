import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Supplier } from './supplier.entity'

@Entity('purchase_orders')
export class PurchaseOrder {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productName: string

    @Column()
    quantity: number

    @Column()
    unitPrice: number

    @Column()
    shippingAddress: string

    @OneToOne(() => Supplier)
    @JoinColumn()
    supplier: Supplier
}
