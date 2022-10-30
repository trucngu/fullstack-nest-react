import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatalogsModule } from './catalogs/catalogs.module'

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
    CatalogsModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule { }
