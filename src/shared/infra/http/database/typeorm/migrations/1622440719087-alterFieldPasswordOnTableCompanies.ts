import { MigrationInterface, QueryRunner } from 'typeorm';

export default class alterFieldPasswordOnTableCompanies1622440719087
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "companies" ALTER COLUMN "company_password" type varchar(100)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "companies" ALTER COLUMN "company_password" type varchar(10)',
    );
  }
}
