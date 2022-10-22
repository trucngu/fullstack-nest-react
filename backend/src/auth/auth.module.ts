import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { jwtConstants } from './constants'
import { AuthController } from './controllers/auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
    controllers: [
        AuthController,
    ],
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
        })
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule {
}
