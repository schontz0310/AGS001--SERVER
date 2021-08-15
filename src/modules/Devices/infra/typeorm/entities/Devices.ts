/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('devices')
class Company {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'device_id',
  })
  id: string;

  @Column({
    name: 'device_code',
  })
  code: string;

  @Column({
    name: 'device_model',
  })
  model: string;

  @Column({
    name: 'device_variant',
  })
  variant: string;

  @Column({
    name: 'device_status',
  })
  status: string;

  @CreateDateColumn({
    name: 'device_created_at',
  })
  created_at: Date;

  @CreateDateColumn({
    name: 'device_updated_at',
  })
  updated_at: Date;
}
export default Company;
