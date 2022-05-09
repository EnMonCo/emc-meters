import { Module } from '@nestjs/common';
import { UserMetersService } from './user-meters.service';
import { UserMetersController } from './user-meters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meter } from '../meters/entities/meter.entity';
import { MetersModule } from '../meters/meters.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meter]), MetersModule],
  controllers: [UserMetersController],
  providers: [UserMetersService],
})
export class UserMetersModule {}
