import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addFieldOdometerToAppointments1665544451738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'appointment_vehicle_odometer',
            type: 'numeric(8,2)',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'appointment_vehicle_odometer')
    }

}
