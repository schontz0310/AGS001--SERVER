import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createDevicesTable1628560295503
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'devices',
        columns: [
          {
            name: 'device_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'device_code',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'device_model',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'device_variant',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'device_status',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'device_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'device_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('devices');
  }
}
