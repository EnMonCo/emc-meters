import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { Meter } from '../../meters/entities/meter.entity';
import { plainToClass } from 'class-transformer';

export default class CreateStatus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const TEST_METER_ID = '7b2fcc5c-253f-48b7-82fe-053d756f13a0';
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(Meter, 'Meter')
      .where('Meter.serialNumber = :serialNumber', {
        id: TEST_METER_ID,
        serialNumber: 'SN-TESTSN',
      })
      .getCount();

    if (count === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Meter)
        .values([
          plainToClass(Meter, {
            id: TEST_METER_ID,
            serialNumber: 'SN-TESTSN',
            name: 'Test Meter',
            password: 'test',
            status: StatusEnum.active,
            hash: 'test',
          }),
        ])
        .execute();
    }
  }
}
