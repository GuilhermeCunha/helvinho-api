import {MigrationInterface, QueryRunner} from "typeorm";

export class updateOndelete31592587901412 implements MigrationInterface {
    name = 'updateOndelete31592587901412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `parameter` DROP FOREIGN KEY `FK_4f644b944f69e48d84d1f740fe6`");
        await queryRunner.query("ALTER TABLE `pool` DROP FOREIGN KEY `FK_394f1a93c0e47745673b72fc959`");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `parameter` ADD CONSTRAINT `FK_4f644b944f69e48d84d1f740fe6` FOREIGN KEY (`poolId`) REFERENCES `pool`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `pool` ADD CONSTRAINT `FK_394f1a93c0e47745673b72fc959` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pool` DROP FOREIGN KEY `FK_394f1a93c0e47745673b72fc959`");
        await queryRunner.query("ALTER TABLE `parameter` DROP FOREIGN KEY `FK_4f644b944f69e48d84d1f740fe6`");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `pool` ADD CONSTRAINT `FK_394f1a93c0e47745673b72fc959` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `parameter` ADD CONSTRAINT `FK_4f644b944f69e48d84d1f740fe6` FOREIGN KEY (`poolId`) REFERENCES `pool`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
