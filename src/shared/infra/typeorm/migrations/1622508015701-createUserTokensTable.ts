import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createUserTokensTable1622508015701
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          {
            name: 'user_token_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_token_token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_token_user_id',
            type: 'uuid',
          },
          {
            name: 'user_token_company_id',
            type: 'uuid',
          },
          {
            name: 'user_token_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'user_token_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'TokenUser',
            referencedTableName: 'users',
            referencedColumnNames: ['user_id'],
            columnNames: ['user_token_user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'TokenCompany',
            referencedTableName: 'companies',
            referencedColumnNames: ['company_id'],
            columnNames: ['user_token_company_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens');
  }
}
