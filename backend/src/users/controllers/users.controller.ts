import { Body, Controller, Param, Post } from '@nestjs/common'
import { RegisterDto } from '../dto/register.dto'
import { UserDto } from '../dto/user.dto'
import { UsersService } from '../users.service'

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post()
    async create(@Body() dto: UserDto) {
        const result = await this.userService.create(dto)
        return result
    }

    @Post(":userId/create-account")
    async createAccount(
        @Param('userId') userId: number,
        @Body() dto: RegisterDto,
    ) {
        const result = await this.userService.register(userId, dto)
        return result
    }
}
