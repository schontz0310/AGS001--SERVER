import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createBanksTable1646711421136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'banks',
              columns: [
                {
                  name: 'bank_id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
                },
                {
                  name: 'bank_code',
                  type: 'smallint',
                  isNullable: false,
                },
                {
                  name: 'bank_name',
                  type: 'varchar(100)',
                  isNullable: false,
                },
                {
                  name: 'bank_created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'bank_updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('banks');
    }

}
