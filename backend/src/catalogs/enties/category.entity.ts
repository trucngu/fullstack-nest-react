import { Entity, Column, PrimaryGeneratedColumn, TreeChildren, TreeParent, Tree } from 'typeorm'

@Entity("categories")
@Tree("materialized-path")
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    key?: number

    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: false, default: true })
    isActive: boolean

    @TreeParent({ onDelete: 'CASCADE' })
    parent?: CategoryEntity

    @TreeChildren({ cascade: true })
    children?: CategoryEntity[]
}
