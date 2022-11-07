import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createUsersTable1622506777887
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'user_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'user_password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'user_company_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'user_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'UserCompany',
            referencedTableName: 'companies',
            referencedColumnNames: ['company_id'],
            columnNames: ['user_company_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
