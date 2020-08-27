import {MigrationInterface, QueryRunner} from "typeorm";

export class reportFixClients1595534330848 implements MigrationInterface {
    name = 'reportFixClients1595534330848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `report` DROP FOREIGN KEY `FK_36d650cd64835565719673e2721`");
        await queryRunner.query("DROP INDEX `IDX_36d650cd64835565719673e272` ON `report`");
        await queryRunner.query("DROP INDEX `REL_36d650cd64835565719673e272` ON `report`");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double NOT NULL");
        await queryRunner.query("ALTER TABLE `report` ADD CONSTRAINT `FK_36d650cd64835565719673e2721` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `report` DROP FOREIGN KEY `FK_36d650cd64835565719673e2721`");
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double(22) NOT NULL");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_36d650cd64835565719673e272` ON `report` (`clientId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_36d650cd64835565719673e272` ON `report` (`clientId`)");
        await queryRunner.query("ALTER TABLE `report` ADD CONSTRAINT `FK_36d650cd64835565719673e2721` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
