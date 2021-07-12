/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('companies')
class Company {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'company_id',
  })
  id: string;

  @Column({
    name: 'company_name',
  })
  name: string;

  @Column({
    name: 'company_type',
  })
  type: string;

  @Column({
    name: 'company_type_value',
  })
  type_value: string;

  @Column({
    name: 'company_comment',
  })
  comment: string;

  @Column({
    name: 'company_address_zip_code',
  })
  address_zip_code: string;

  @Column({
    name: 'company_address_street',
  })
  address_street: string;

  @Column({
    name: 'company_address_number',
  })
  address_number: string;

  @Column({
    name: 'company_address_district',
  })
  address_district: string;

  @Column({
    name: 'company_address_city',
  })
  address_city: string;

  @Column({
    name: 'company_address_state',
  })
  address_state: string;

  @Column({
    name: 'company_contact',
  })
  contact: string;

  @Column({
    name: 'company_phone',
  })
  phone: string;

  @Column({
    name: 'company_user',
  })
  user: string;

  @Column({
    name: 'company_email',
  })
  email: string;

  @Column({
    name: 'company_password',
  })
  @Exclude()
  password: string;

  @CreateDateColumn({
    name: 'company_created_at',
  })
  created_at: Date;

  @CreateDateColumn({
    name: 'company_updated_at',
  })
  updated_at: Date;
}
export default Company;
