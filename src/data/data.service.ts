import { Injectable, Logger } from '@nestjs/common';
import { CreateShortTermDataDto } from './dto/create-short-term-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ShortTermData } from './entities/short-term-data.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import wt from '../lib/discrete-wavelets/wt';
import { Meter } from '../meters/entities/meter.entity';
import { ConfigService } from '@nestjs/config';
import { LongTermData } from './entities/long-term-data.entity';
import { StatusEnum } from '../statuses/statuses.enum';

@Injectable()
export class DataService {
  private readonly logger = new Logger(DataService.name);

  constructor(
    private configService: ConfigService,
    @InjectRepository(ShortTermData)
    private shortTermDataRepository: Repository<ShortTermData>,
    @InjectRepository(LongTermData)
    private longTermDataRepository: Repository<LongTermData>,
    @InjectRepository(Meter)
    private metersRepository: Repository<Meter>,
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

  async getData(meterId: string, from?: Date, to?: Date) {
    const finalData = [];

    const longTermData = await this.longTermDataRepository.find({
      where: {
        meter: { id: meterId },
        dateFrom: Between(from, to),
      },
    });
    // restore long
    for (const d of longTermData) {
      const power = wt.waverec(d.powerCoefficients, 'haar');
      const voltage = wt.waverec(d.voltageCoefficients, 'haar');
      const data = power.map((p, i) => ({
        power: p,
        voltage: voltage[i],
        line: d.line,
        timestamp: new Date(
          d.dateFrom.getTime() +
            (d.dateTo.getTime() - d.dateFrom.getTime()) * (i / power.length),
        ),
      }));

      const filteredData = data.filter(
        (d) => d.timestamp >= from && d.timestamp <= to,
      );
      finalData.push(...filteredData);
    }

    const shortTermData = await this.shortTermDataRepository.find({
      where: {
        meter: { id: meterId },
        timestamp: Between(from, to),
      },
    });
    finalData.push(...shortTermData);
    return finalData;
  }

  getLiveData(meterId: string) {
    return this.shortTermDataRepository.find({
      where: {
        meter: { id: meterId },
      },
      order: {
        timestamp: 'DESC',
      },
      take: 1,
    });
  }

  // @Cron('*5 * * * * *')
  @Cron(CronExpression.EVERY_12_HOURS)
  async handleWaveletConversion() {
    // const test = Array.from({ length: 1000 }, (_, i) => i);
    // const coeffs = wt.wavedec(test, 'haar');
    //
    // console.log(coeffs);
    //
    // const data = wt.waverec(coeffs, 'haar');
    //
    // console.log(data);
    this.logger.log('Starting conversion process');

    const meters = await this.metersRepository.find({
      where: {
        status: { id: StatusEnum.active },
      },
    });
    this.logger.log(`Found ${meters.length} meters`);

    for (const meter of meters) {
      this.logger.log(`Processing meter ${meter.id}`);

      const shortTermDataCount = await this.shortTermDataRepository.count({
        where: {
          meter: { id: meter.id },
          line: 1,
        },
      });

      if (
        shortTermDataCount <
        this.configService.get('app.data.shortTermThreshold')
      ) {
        this.logger.debug(
          `Skipping meter ${
            meter.id
          } due to low data count (${shortTermDataCount} < ${this.configService.get(
            'app.data.shortTermThreshold',
          )})`,
        );
        continue;
      }

      const shortTermData = await this.shortTermDataRepository.find({
        where: {
          meter: { id: meter.id },
        },
        take: this.configService.get('app.data.shortTermThreshold'),
        order: {
          timestamp: 'ASC',
        },
      });

      const powerCoefficients = wt.wavedec(
        shortTermData.map((d) => d.power),
        'haar',
      );

      const voltageCoefficients = wt.wavedec(
        shortTermData.map((d) => d.voltage),
        'haar',
      );

      const dateFrom = shortTermData[0].timestamp;
      const dateTo = shortTermData[shortTermData.length - 1].timestamp;

      const longTermData = this.longTermDataRepository.create({
        meter,
        line: 1,
        powerCoefficients,
        voltageCoefficients,
        dateFrom,
        dateTo,
      });

      await this.longTermDataRepository.save(longTermData);

      await this.shortTermDataRepository.delete({
        meter: { id: meter.id },
        timestamp: Between(dateFrom, dateTo),
      });

      this.logger.log(`Finished meter processing ${meter.id}`);
    }
  }
}
