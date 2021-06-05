/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'user_token_id',
  })
  id: string;

  @Column({
    name: 'user_token_token',
  })
  @Generated('uuid')
  token: string;

  @Column({
    name: 'user_token_user_id',
  })
  user_id: string;

  @Column({
    name: 'user_token_company_id',
  })
  company_id: string;

  @CreateDateColumn({
    name: 'user_token_created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'user_token_update_at',
  })
  updated_at: Date;
}

export default UserToken;
