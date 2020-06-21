import {MigrationInterface, QueryRunner} from "typeorm";

export class updateStock1592710789145 implements MigrationInterface {
    name = 'updateStock1592710789145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `FK_1546a0933f9847b1a9d09214d67` ON `product_quantity`");
        await queryRunner.query("DROP INDEX `FK_aac90b50cadd82476ddd61c16e4` ON `product_quantity`");
        await queryRunner.query("DROP INDEX `FK_2a2cb83bf385837810ac8f1718c` ON `stock`");
        await queryRunner.query("ALTER TABLE `stock` DROP COLUMN `value`");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double NOT NULL");
        await queryRunner.query("ALTER TABLE `product_quantity` ADD CONSTRAINT `FK_1546a0933f9847b1a9d09214d67` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product_quantity` ADD CONSTRAINT `FK_aac90b50cadd82476ddd61c16e4` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `stock` ADD CONSTRAINT `FK_2a2cb83bf385837810ac8f1718c` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `stock` DROP FOREIGN KEY `FK_2a2cb83bf385837810ac8f1718c`");
        await queryRunner.query("ALTER TABLE `product_quantity` DROP FOREIGN KEY `FK_aac90b50cadd82476ddd61c16e4`");
        await queryRunner.query("ALTER TABLE `product_quantity` DROP FOREIGN KEY `FK_1546a0933f9847b1a9d09214d67`");
        await queryRunner.query("ALTER TABLE `product_quantity` CHANGE `value` `value` double(22) NOT NULL");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `stock` ADD `value` double(22) NOT NULL");
        await queryRunner.query("CREATE INDEX `FK_2a2cb83bf385837810ac8f1718c` ON `stock` (`clientId`)");
        await queryRunner.query("CREATE INDEX `FK_aac90b50cadd82476ddd61c16e4` ON `product_quantity` (`stockId`)");
        await queryRunner.query("CREATE INDEX `FK_1546a0933f9847b1a9d09214d67` ON `product_quantity` (`productId`)");
    }

}
