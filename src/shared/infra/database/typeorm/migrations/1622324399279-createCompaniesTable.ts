import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createCompaniesTable1622324399279
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'company_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'company_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'company_type',
            type: 'varchar(4)',
            isNullable: false,
          },
          {
            name: 'company_type_value',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'company_comment',
            type: 'varchar(20)',
            isNullable: false,
          },
          {
            name: 'company_address_zip_code',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'company_address_street',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'company_address_number',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'company_address_district',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'company_address_city',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'company_address_state',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'company_contact',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'company_phone',
            type: 'varchar(20)',
            isNullable: false,
          },
          {
            name: 'company_user',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'company_email',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'company_password',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'company_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'company_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies');
  }
}
