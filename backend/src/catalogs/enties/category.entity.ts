import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'

@Entity("categories")
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @Column({
        default: true,
        name: "is_active"
    })
    isActive: boolean

    @ManyToOne(() => CategoryEntity, cat => cat.children)
    @JoinColumn({ name: "parent_id", referencedColumnName: "id" })
    parent: CategoryEntity

    @OneToMany(() => CategoryEntity, cat => cat.parent)
    children: CategoryEntity[]
}
