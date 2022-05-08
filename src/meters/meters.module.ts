import { Module } from '@nestjs/common';
import { MetersService } from './meters.service';
import { MetersController } from './meters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meter } from './entities/meter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meter])],
  controllers: [MetersController],
  providers: [MetersService],
  exports: [MetersService],
})
export class MetersModule {}
