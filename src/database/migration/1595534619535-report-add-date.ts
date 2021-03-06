import {MigrationInterface, QueryRunner} from "typeorm";

export class reportAddDate1595534619535 implements MigrationInterface {
    name = 'reportAddDate1595534619535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `report` ADD `date` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double(22) NOT NULL");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `report` DROP COLUMN `date`");
    }

}
