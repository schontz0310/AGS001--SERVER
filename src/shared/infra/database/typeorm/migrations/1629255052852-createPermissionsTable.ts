import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createPermissionsTable1629255052852
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'permission_appointment_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'permission_appointment_code',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'permission_appointment_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'permission_appointment_hour',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'permission_appointment_device',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'permission_appointment_company',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'permission_appointment_operator_tag',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'permission_appointment_vehicle_tag',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'permission_appointment_permission',
            type: 'varchar(2)',
            isNullable: false,
          },
          {
            name: 'permission_appointment_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'permission_appointment_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permissions');
  }
}
