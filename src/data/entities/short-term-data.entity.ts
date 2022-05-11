import { EntityHelper } from '../../utils/entity-helper';
import { Column, CreateDateColumn, Entity, Index, ManyToOne } from 'typeorm';
import { Meter } from '../../meters/entities/meter.entity';

@Entity('short_term_data')
@Index(['meter', 'timestamp'], { unique: true })
export class ShortTermData extends EntityHelper {
  @ManyToOne(() => Meter, (meter) => meter.shortTermData, { primary: true })
  meter: Meter;

  @Column()
  voltage: number;

  @Column()
  power: number;

  @Column()
  line: number;

  @CreateDateColumn()
  timestamp: Date;
}
