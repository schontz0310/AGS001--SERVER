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

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'user_id',
  })
  id: string;

  @Column({
    name: 'user_name',
  })
  name: string;

  @Column({
    name: 'user_email',
  })
  email: string;

  @Exclude()
  @Column({
    name: 'user_password',
  })
  password: string;

  @Column({
    name: 'user_company_id',
  })
  company_id: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'user_company_id' })
  company: Company;

  @CreateDateColumn({
    name: 'user_created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'user_updated_at',
  })
  updated_at: Date;
}

export default User;
