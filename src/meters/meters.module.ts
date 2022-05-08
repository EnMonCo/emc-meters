import { Module } from '@nestjs/common';
import { MetersService } from './meters.service';
import { MetersController } from './meters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meter } from './entities/meter.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meter]),
    ClientsModule.register([
      {
        name: 'EMC_ACCOUNTS',
        transport: Transport.TCP,
        options: { host: '0.0.0.0', port: 8010 },
      },
    ]),
  ],
  controllers: [MetersController],
  providers: [MetersService],
  exports: [MetersService],
})
export class MetersModule {}
