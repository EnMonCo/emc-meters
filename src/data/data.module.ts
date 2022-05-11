import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortTermData } from './entities/short-term-data.entity';
import { MetersModule } from '../meters/meters.module';
import { Meter } from '../meters/entities/meter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShortTermData]),
    TypeOrmModule.forFeature([Meter]),
    MetersModule,
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
