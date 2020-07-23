import {MigrationInterface, QueryRunner} from "typeorm";

export class reportClient1595528488604 implements MigrationInterface {
    name = 'reportClient1595528488604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `report` DROP FOREIGN KEY `FK_9f99c776ba6d2cf3778dbe1472e`");
        await queryRunner.query("DROP INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product`");
        await queryRunner.query("DROP INDEX `IDX_e97a7f3c48c04b54ffc24e5fc7` ON `employee`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("ALTER TABLE `report` CHANGE `poolId` `clientId` varchar(36) NULL");
        await queryRunner.query("CREATE TABLE `report_pools_pool` (`reportId` varchar(36) NOT NULL, `poolId` varchar(36) NOT NULL, INDEX `IDX_f7bf58e4b43b3437214e889232` (`reportId`), INDEX `IDX_6442a20154839087c5b0ba5db5` (`poolId`), PRIMARY KEY (`reportId`, `poolId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `report` ADD UNIQUE INDEX `IDX_36d650cd64835565719673e272` (`clientId`)");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `product` ADD `name` text NOT NULL");
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double NOT NULL");
        await queryRunner.query("ALTER TABLE `employee` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `employee` ADD `name` text NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`");
        await queryRunner.query("ALTER TABLE `user` ADD `email` text NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_36d650cd64835565719673e272` ON `report` (`clientId`)");
        await queryRunner.query("ALTER TABLE `report` ADD CONSTRAINT `FK_36d650cd64835565719673e2721` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `report_pools_pool` ADD CONSTRAINT `FK_f7bf58e4b43b3437214e8892325` FOREIGN KEY (`reportId`) REFERENCES `report`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `report_pools_pool` ADD CONSTRAINT `FK_6442a20154839087c5b0ba5db57` FOREIGN KEY (`poolId`) REFERENCES `pool`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `report_pools_pool` DROP FOREIGN KEY `FK_6442a20154839087c5b0ba5db57`");
        await queryRunner.query("ALTER TABLE `report_pools_pool` DROP FOREIGN KEY `FK_f7bf58e4b43b3437214e8892325`");
        await queryRunner.query("ALTER TABLE `report` DROP FOREIGN KEY `FK_36d650cd64835565719673e2721`");
        await queryRunner.query("DROP INDEX `REL_36d650cd64835565719673e272` ON `report`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`");
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(100) NOT NULL");
        await queryRunner.query("ALTER TABLE `employee` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `employee` ADD `name` varchar(100) NOT NULL");
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double(22) NOT NULL");
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `product` ADD `name` varchar(100) NOT NULL");
        await queryRunner.query("ALTER TABLE `report` DROP INDEX `IDX_36d650cd64835565719673e272`");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("DROP INDEX `IDX_6442a20154839087c5b0ba5db5` ON `report_pools_pool`");
        await queryRunner.query("DROP INDEX `IDX_f7bf58e4b43b3437214e889232` ON `report_pools_pool`");
        await queryRunner.query("DROP TABLE `report_pools_pool`");
        await queryRunner.query("ALTER TABLE `report` CHANGE `clientId` `poolId` varchar(36) NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user` (`email`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_e97a7f3c48c04b54ffc24e5fc7` ON `employee` (`name`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product` (`name`)");
        await queryRunner.query("ALTER TABLE `report` ADD CONSTRAINT `FK_9f99c776ba6d2cf3778dbe1472e` FOREIGN KEY (`poolId`) REFERENCES `pool`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

}
