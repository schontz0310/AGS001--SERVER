import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('banks')
class Company {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'bank_id',
  })
  id: string;

  @Column({
    name: 'bank_code',
  })
  code: number;

  @Column({
    name: 'bank_name',
  })
  name: string;

  @Exclude()
  @CreateDateColumn({
    name: 'bank_created_at',
  })
  createdAt: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'bank_updated_at',
  })
  updatedAt: Date;

}
export default Company;
