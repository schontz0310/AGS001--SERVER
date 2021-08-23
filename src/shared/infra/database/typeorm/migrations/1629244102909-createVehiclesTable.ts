import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createVehiclesTable1629244102909
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicles',
        columns: [
          {
            name: 'vehicle_appointment_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'vehicle_appointment_code',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'vehicle_appointment_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'vehicle_appointment_hour',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'vehicle_appointment_device',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'vehicle_appointment_company',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'vehicle_appointment_tag',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'vehicle_appointment_name',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'vehicle_appointment_fuel',
            type: 'varchar(2)',
            isNullable: false,
          },
          {
            name: 'vehicle_appointment_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'vehicle_appointment_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicles');
  }
}
