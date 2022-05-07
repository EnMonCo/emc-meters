import { EntityHelper } from '../../utils/entity-helper';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../statuses/entities/status.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class Meter extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

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
