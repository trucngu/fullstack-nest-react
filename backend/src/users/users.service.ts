import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RegisterDto } from './dto/register.dto'
import { UserDto } from './dto/user.dto'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    async findByUserName(username: string) {
        return this.userRepository.findOneBy({ username })
    }

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOneBy({ id })
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id)
    }

    async create(dto: UserDto): Promise<User> {
        const result = await this.userRepository.save({
            firstName: dto.firstName,
            lastName: dto.lastName,
            isActive: true
        })
        return result
    }

    async register(userId: number, dto: RegisterDto) {
        const user = await this.findOne(userId)
        const salt = await bcrypt.genSalt(10)
        user.username = dto.username
        user.hashPassword = await bcrypt.hash(dto.password, salt)
        user.salt = salt
        return this.userRepository.save(user)
    }
}
