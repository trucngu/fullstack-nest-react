import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUserName(username)
        const isPasswordMatched = await bcrypt.compare(password, user.hashPassword)
        if (isPasswordMatched) {
            return user
        }
        return null
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId }
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
