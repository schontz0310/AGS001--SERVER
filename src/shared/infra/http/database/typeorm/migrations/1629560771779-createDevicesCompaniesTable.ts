import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createDevicesCompaniesTable1629560771779
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'devices-companies',
        columns: [
          {
            name: 'device_company_device_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'device_company_company_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'device_company_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'device_company_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'CompanyDevice',
            referencedTableName: 'companies',
            referencedColumnNames: ['company_id'],
            columnNames: ['device_company_company_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'DeviceCompany',
            referencedTableName: 'devices',
            referencedColumnNames: ['device_id'],
            columnNames: ['device_company_device_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('devices-companies');
  }
}
