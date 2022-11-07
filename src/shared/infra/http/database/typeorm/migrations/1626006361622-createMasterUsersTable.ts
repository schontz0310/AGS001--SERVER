import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createMasterUsersTable1626006361622
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_master',
        columns: [
          {
            name: 'admin_users_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'admin_users_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'admin_users_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'admin_users_password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'admin_users_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'admin_users_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_master');
  }
}
