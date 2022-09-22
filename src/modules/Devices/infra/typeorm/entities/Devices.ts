/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeviceStauts } from './types';

@Entity('devices')
class Device {
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
    enum: DeviceStauts,
    default: DeviceStauts.PENDING
  })
  status: string;

  @CreateDateColumn({
    name: 'device_created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'device_updated_at',
  })
  updatedAt: Date;
}
export default Device;
