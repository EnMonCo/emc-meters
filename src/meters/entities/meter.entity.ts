import { EntityHelper } from '../../utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../statuses/entities/status.entity';

export class Meter extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Index()
  @Column({ nullable: true })
  name: string;

  @Column()
  serialNumber: string;

  @Column({ nullable: true })
  @Index()
  hash: string | null;

  @Index()
  @Column({ nullable: true })
  userId: number | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
