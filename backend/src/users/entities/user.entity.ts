import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ default: true })
    isActive: boolean

    @Column({
        nullable: true
    })
    username: string

    @Column({
        nullable: true
    })
    hashPassword: string

    @Column({
        nullable: true
    })
    salt: string
}
