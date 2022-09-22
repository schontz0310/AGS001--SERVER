import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddFieldAvatarToCompanies1645170277840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('companies', new TableColumn({
            name: 'company_avatar',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('companies', 'company_avatar')
    }

}
