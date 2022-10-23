import { Entity, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, Tree } from 'typeorm'

@Entity("categories")
@Tree("nested-set")
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    key: number

    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: false, default: true })
    isActive: boolean

    @TreeParent()
    parent: CategoryEntity

    @TreeChildren()
    children: CategoryEntity[]
}
