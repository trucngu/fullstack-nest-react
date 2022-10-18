import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { CatalogsModule } from './catalogs/catalogs.module'
import { HealthModule } from './health/health.module'
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'spacesales',
      synchronize: true,
      autoLoadEntities: true
    }),
    AuthModule,
    UsersModule,
    CatalogsModule,
    HealthModule,
    PurchaseOrderModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule { }
