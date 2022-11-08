import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createAppointmentsTable1626396156438
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'appointment_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'appointment_code',
            type: 'varchar(5)',
            isNullable: false,
          },
          {
            name: 'appointment_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'appointment_hour',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'appointment_device',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'appointment_company',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'appointment_operator_tag',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'appointment_operator_name',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'appointment_operator_level',
            type: 'varchar(2)',
            isNullable: false,
          },
          {
            name: 'appointment_vehicle_tag',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'appointment_vehicle_name',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'appointment_vehicle_fuel',
            type: 'varchar(2)',
            isNullable: false,
          },
          {
            name: 'appointment_fuel_quantity',
            type: 'numeric(5,2)',
            isNullable: false,
          },
          {
            name: 'appointment_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'appointment_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
