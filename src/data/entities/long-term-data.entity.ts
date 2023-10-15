import { EntityHelper } from '../../utils/entity-helper';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Meter } from '../../meters/entities/meter.entity';

@Entity('long_term_data')
// @Index(['meter', 'line', 'timestamp'], { unique: true })
export class LongTermData extends EntityHelper {
  @ManyToOne(() => Meter, (meter) => meter.shortTermData, {
    primary: true,
    onDelete: 'CASCADE',
  })
  meter: Meter;

  // @Column({ type: 'float' })
  // voltage: number;
  //
  // @Column({ type: 'float' })
  // power: number;
  //
  @PrimaryColumn()
  line: number;

  @Column({
    type: 'json',
    transformer: { to: (v) => JSON.stringify(v), from: (v) => JSON.parse(v) },
  })
  powerCoefficients: number[][];

  @Column({
    type: 'json',
    transformer: { to: (v) => JSON.stringify(v), from: (v) => JSON.parse(v) },
  })
  voltageCoefficients: number[][];

  // @CreateDateColumn({ primary: true })
  // timestamp: Date;

  @Column({ type: 'timestamp', primary: true })
  dateFrom: Date;

  @Column({ type: 'timestamp', primary: true })
  dateTo: Date;
}
