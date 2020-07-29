import {MigrationInterface, QueryRunner} from "typeorm";

export class parametersToString1596027292048 implements MigrationInterface {
    name = 'parametersToString1596027292048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `parameter` ADD `chlorine` varchar(255) NOT NULL DEFAULT 'NAO MEDIDO'");
        await queryRunner.query("ALTER TABLE `parameter` DROP COLUMN `ph`");
        await queryRunner.query("ALTER TABLE `parameter` ADD `ph` varchar(255) NOT NULL DEFAULT 'NAO MEDIDO'");
        await queryRunner.query("ALTER TABLE `parameter` DROP COLUMN `alkalinity`");
        await queryRunner.query("ALTER TABLE `parameter` ADD `alkalinity` varchar(255) NOT NULL DEFAULT 'NAO MEDIDO'");
        await queryRunner.query("ALTER TABLE `parameter` DROP COLUMN `cyanuric`");
        await queryRunner.query("ALTER TABLE `parameter` ADD `cyanuric` varchar(255) NOT NULL DEFAULT 'NAO MEDIDO'");
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double(22) NOT NULL");
        await queryRunner.query("ALTER TABLE `parameter` DROP COLUMN `cyanuric`");
        await queryRunner.query("ALTER TABLE `parameter` ADD `cyanuric` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` DROP COLUMN `alkalinity`");
        await queryRunner.query("ALTER TABLE `parameter` ADD `alkalinity` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` DROP COLUMN `ph`");
        await queryRunner.query("ALTER TABLE `parameter` ADD `ph` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` DROP COLUMN `chlorine`");
    }

}
