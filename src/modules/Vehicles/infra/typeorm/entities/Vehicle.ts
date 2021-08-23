/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vehicle')
class Company {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'vehicle_id',
  })
  id: string;

  @Column({
    name: 'vehicle_code',
  })
  code: string;

  @Column({
    name: 'vehicle_model',
  })
  model: string;

  @Column({
    name: 'vehicle_variant',
  })
  variant: string;

  @Column({
    name: 'vehicle_status',
  })
  status: string;

  @CreateDateColumn({
    name: 'vehicle_created_at',
  })
  created_at: Date;

  @CreateDateColumn({
    name: 'vehicle_updated_at',
  })
  updated_at: Date;
}
export default Company;
