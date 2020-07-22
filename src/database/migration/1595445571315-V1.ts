import {MigrationInterface, QueryRunner} from "typeorm";

export class V11595445571315 implements MigrationInterface {
    name = 'V11595445571315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `parameter` (`id` varchar(36) NOT NULL, `chlorine` double NOT NULL DEFAULT 0, `ph` double NOT NULL DEFAULT 0, `alkalinity` double NOT NULL DEFAULT 0, `acid` double NOT NULL DEFAULT 0, `cyanuric` double NOT NULL DEFAULT 0, `date` datetime NOT NULL, `poolId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `report` (`id` varchar(36) NOT NULL, `message` text NOT NULL, `status` text NOT NULL, `poolId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `pool` (`id` varchar(36) NOT NULL, `name` text NOT NULL, `clientId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` varchar(36) NOT NULL, `name` varchar(100) NOT NULL, `unit` text NOT NULL, UNIQUE INDEX `IDX_22cc43e9a74d7498546e9a63e7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product_quantity` (`id` varchar(36) NOT NULL, `value` double NOT NULL, `productId` varchar(36) NULL, `stockId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `stock` (`id` varchar(36) NOT NULL, `date` datetime NOT NULL, `clientId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client` (`id` varchar(36) NOT NULL, `name` text NOT NULL, `address` text NOT NULL, `cnpj` text NOT NULL, `cellphone` text NOT NULL, `secondCellphone` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `employee` (`id` varchar(36) NOT NULL, `name` varchar(100) NOT NULL, `address` text NOT NULL, `category` text NOT NULL, `cellphone` text NOT NULL, `secondCellphone` text NOT NULL, UNIQUE INDEX `IDX_e97a7f3c48c04b54ffc24e5fc7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `reset_password` (`id` varchar(36) NOT NULL, `user_id` text NOT NULL, `token` text NOT NULL, `expiresAt` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `email` varchar(100) NOT NULL, `username` text NOT NULL, `password` text NOT NULL, `role` text NOT NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `parameter` ADD CONSTRAINT `FK_4f644b944f69e48d84d1f740fe6` FOREIGN KEY (`poolId`) REFERENCES `pool`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `report` ADD CONSTRAINT `FK_9f99c776ba6d2cf3778dbe1472e` FOREIGN KEY (`poolId`) REFERENCES `pool`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pool` ADD CONSTRAINT `FK_394f1a93c0e47745673b72fc959` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product_quantity` ADD CONSTRAINT `FK_1546a0933f9847b1a9d09214d67` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `product_quantity` ADD CONSTRAINT `FK_aac90b50cadd82476ddd61c16e4` FOREIGN KEY (`stockId`) REFERENCES `stock`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `stock` ADD CONSTRAINT `FK_2a2cb83bf385837810ac8f1718c` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `stock` DROP FOREIGN KEY `FK_2a2cb83bf385837810ac8f1718c`");
        await queryRunner.query("ALTER TABLE `product_quantity` DROP FOREIGN KEY `FK_aac90b50cadd82476ddd61c16e4`");
        await queryRunner.query("ALTER TABLE `product_quantity` DROP FOREIGN KEY `FK_1546a0933f9847b1a9d09214d67`");
        await queryRunner.query("ALTER TABLE `pool` DROP FOREIGN KEY `FK_394f1a93c0e47745673b72fc959`");
        await queryRunner.query("ALTER TABLE `report` DROP FOREIGN KEY `FK_9f99c776ba6d2cf3778dbe1472e`");
        await queryRunner.query("ALTER TABLE `parameter` DROP FOREIGN KEY `FK_4f644b944f69e48d84d1f740fe6`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `reset_password`");
        await queryRunner.query("DROP INDEX `IDX_e97a7f3c48c04b54ffc24e5fc7` ON `employee`");
        await queryRunner.query("DROP TABLE `employee`");
        await queryRunner.query("DROP TABLE `client`");
        await queryRunner.query("DROP TABLE `stock`");
        await queryRunner.query("DROP TABLE `product_quantity`");
        await queryRunner.query("DROP INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `pool`");
        await queryRunner.query("DROP TABLE `report`");
        await queryRunner.query("DROP TABLE `parameter`");
    }

}
