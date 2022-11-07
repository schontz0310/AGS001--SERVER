/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Device from '@modules/Devices/infra/typeorm/entities/Devices';
import upload from '@config/upload';

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
  typeValue: string;

  @Column({
    name: 'company_comment',
  })
  comment: string;

  @Column({
    name: 'company_address_zip_code',
  })
  addressZipCode: string;

  @Column({
    name: 'company_address_street',
  })
  addressStreet: string;

  @Column({
    name: 'company_address_number',
  })
  addressNumber: string;

  @Column({
    name: 'company_address_district',
  })
  addressDistrict: string;

  @Column({
    name: 'company_address_city',
  })
  addressCity: string;

  @Column({
    name: 'company_address_state',
  })
  addressState: string;

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

  @ManyToMany(() => Device, { eager: true })
  @JoinTable({
    name: 'devices-companies',
    joinColumns: [{ name: 'device_company_company_id' }],
    inverseJoinColumns: [{ name: 'device_company_device_id' }],
  })
  devices: Device[];

  @CreateDateColumn({
    name: 'company_created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'company_updated_at',
  })
  updatedAt: Date;

  @Column({
    name: 'company_avatar',
  })
  avatar: string;

  @Expose({name: 'avatarUrl'})
  getAvatarUrl(): string | null {
    if(!this.avatar) {
      return null
    }
    switch (upload.driver) {
      case 'disk':
        return `${process.env.APP_LOCAL_STATIC_FILES_PATH_URL}/${process.env.APP_API_PATH_STATIC_FILES}/${this.avatar}`
      case 's3':
        return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }
}
export default Company;
