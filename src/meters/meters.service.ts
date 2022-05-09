import { Injectable } from '@nestjs/common';
import { UpdateMeterDto } from './dto/update-meter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meter } from './entities/meter.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { CreateMeterDto } from './dto/create-meter.dto';

@Injectable()
export class MetersService {
  constructor(
    @InjectRepository(Meter)
    private metersRepository: Repository<Meter>,
  ) {}

  create(createMeterDto: CreateMeterDto) {
    return this.metersRepository.save(
      this.metersRepository.create(createMeterDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.metersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Meter>) {
    return this.metersRepository.findOne({
      where: fields,
    });
  }

  update(id: string, updateMeterDto: UpdateMeterDto) {
    return this.metersRepository.save(
      this.metersRepository.create({
        id,
        ...updateMeterDto,
      }),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.metersRepository.softDelete(id);
  }
}
