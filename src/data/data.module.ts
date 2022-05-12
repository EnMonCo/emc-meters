import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortTermData } from './entities/short-term-data.entity';
import { MetersModule } from '../meters/meters.module';
import { Meter } from '../meters/entities/meter.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShortTermData]),
    TypeOrmModule.forFeature([Meter]),
    MetersModule,
    AuthModule,
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
