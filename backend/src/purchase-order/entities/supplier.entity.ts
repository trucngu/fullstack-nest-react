import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('suppliers')
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    name: string

    @Column()
    phone: string

    @Column()
    email: string

    @Column()
    addressLine1: string

    @Column()
    addressLine2: string

    @Column()
    addressLine3: string

    @Column()
    addressLine4: string

    @Column()
    addressLine5: string
}
