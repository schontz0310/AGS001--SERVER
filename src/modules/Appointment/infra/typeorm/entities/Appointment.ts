/* eslint-disable radix */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FuelType, OperatorLevel } from './types';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'appointment_id',
  })
  id: string;

  @Column({
    name: 'appointment_code',
  })
  code: string;

  @Column({
    type: 'date',
    name: 'appointment_date',
  })
  date: string;

  @Column({
    type: 'time',
    name: 'appointment_hour',
  })
  hour: string;

  @Column({
    name: 'appointment_device',
  })
  device: String;

  @Column({
    name: 'appointment_company',
  })
  company: String;

  @Column({
    name: 'appointment_operator_tag',
  })
  operatorTag: String;

  @Column({
    name: 'appointment_operator_name',
  })
  operatorName: String;

  @Column({
    name: 'appointment_operator_level',
    enum: OperatorLevel,
    default: OperatorLevel.DRIVER
  })
  operatorLevel: String;

  @Column({
    name: 'appointment_vehicle_tag',
  })
  vehicleTag: String;

  @Column({
    name: 'appointment_vehicle_name',
  })
  vehicleName: String;

  @Column({
    name: 'appointment_vehicle_fuel',
    enum: FuelType,
    default: FuelType.DIESEL_S1O
  })
  fuelType: String;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    name: 'appointment_vehicle_odometer',
    default: 0,
  })
  vehicleOdometer: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    name: 'appointment_fuel_quantity',
  })
  fuelQuantity: number;


  @CreateDateColumn({
    name: 'appointment_created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'appointment_updated_at',
  })
  updatedAt: Date;
}
export default Appointment;
