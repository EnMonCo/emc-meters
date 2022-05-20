import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Meter } from '../../meters/entities/meter.entity';

@Entity('short_term_data')
// @Index(['meter', 'line', 'timestamp'], { unique: true })
export class ShortTermData extends EntityHelper {
  @ManyToOne(() => Meter, (meter) => meter.shortTermData, {
    primary: true,
  })
  meter: Meter;

  @Column({ type: 'float' })
  voltage: number;

  @Column({ type: 'float' })
  power: number;

  @PrimaryColumn()
  line: number;

  @CreateDateColumn({ primary: true })
  timestamp: Date;
}
