import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortTermData } from './entities/short-term-data.entity';
import { LongTermData } from './entities/long-term-data.entity';
import { MetersModule } from '../meters/meters.module';
import { Meter } from '../meters/entities/meter.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ShortTermData]),
    TypeOrmModule.forFeature([LongTermData]),
    TypeOrmModule.forFeature([Meter]),
    MetersModule,
    AuthModule,
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
