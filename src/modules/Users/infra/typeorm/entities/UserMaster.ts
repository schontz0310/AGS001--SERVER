/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Company from '@modules/Companies/infra/typeorm/entities/Company';

@Entity('users_master')
class UserMaster {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'admin_users_id',
  })
  id: string;

  @Column({
    name: 'admin_users_name',
  })
  name: string;

  @Column({
    name: 'admin_users_email',
  })
  email: string;

  @Exclude()
  @Column({
    name: 'admin_users_password',
  })
  password: string;

  @CreateDateColumn({
    name: 'admin_users_created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'admin_users_updated_at',
  })
  updated_at: Date;
}

export default UserMaster;