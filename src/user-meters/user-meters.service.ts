import { Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { InjectRepository } from '@nestjs/typeorm';
import { Meter } from '../meters/entities/meter.entity';
import { Repository } from 'typeorm';
import { StatusEnum } from '../statuses/statuses.enum';
import { plainToClass } from 'class-transformer';
import { Status } from '../statuses/entities/status.entity';

@Injectable()
export class UserMetersService {
  constructor(
    @InjectRepository(Meter)
    private metersRepository: Repository<Meter>,
  ) {}

  async findManyWithPagination(
    userId: number,
    paginationOptions: IPaginationOptions,
  ) {
    const [data, totalCount] = await this.metersRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        userId,
      },
    });
    return { data, totalCount };
  }

  async pair(hash: string, userId: number) {
    const meter = await this.metersRepository.findOne({
      where: {
        hash,
      },
    });
    if (!meter || meter.userId) {
      throw new NotFoundException('meter:notFound');
    }
    if (meter.status.id !== StatusEnum.waiting_for_pairing) {
      throw new NotFoundException('meter:notWaitingForPairing');
    }
    meter.userId = userId;
    meter.status = plainToClass(Status, {
      id: StatusEnum.active,
    });
    return await meter.save();
  }
}
