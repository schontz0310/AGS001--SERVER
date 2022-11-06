import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createDeviceRegisterTable1629942727294
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'register-device',
        columns: [
          {
            name: 'register_device_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'register_device_code',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'register_device_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'register_device_hour',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'register_device_device',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'register_device_company',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'register_device_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'register_device_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('register-device');
  }
}
