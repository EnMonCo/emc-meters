import { Injectable } from '@nestjs/common';
import { CreateShortTermDataDto } from './dto/create-short-term-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ShortTermData } from './entities/short-term-data.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(ShortTermData)
    private shortTermDataRepository: Repository<ShortTermData>,
  ) {}

  addData(meterId: string, data: CreateShortTermDataDto[]) {
    const insertData = data.map((d) => ({
      ...d,
      meter: { id: meterId },
    }));
    return this.shortTermDataRepository
      .createQueryBuilder()
      .insert()
      .values(insertData)
      .execute();
  }

  getData(meterId: string, from?: Date, to?: Date) {
    return this.shortTermDataRepository.find({
      where: {
        meter: { id: meterId },
        timestamp: Between(from, to),
      },
    });
  }
}
