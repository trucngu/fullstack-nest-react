import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HealthCheck, TypeOrmHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus'

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
        private readonly disk: DiskHealthIndicator
    ) { }

    @Get("db")
    @HealthCheck()
    checkDatabase() {
        return this.health.check([
            () => this.db.pingCheck('database'),
        ])
    }

    @Get("disk")
    @HealthCheck()
    checkDisk() {
        return this.health.check([
            () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
        ])
    }
}