import { MigrationInterface, QueryRunner } from 'typeorm'

export class createPool1592584500459 implements MigrationInterface {
    name = 'createPool1592584500459'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `pool` (`id` varchar(36) NOT NULL, `name` text NOT NULL, `clientId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
      await queryRunner.query('ALTER TABLE `parameter` ADD `date` date NOT NULL')
      await queryRunner.query('ALTER TABLE `parameter` ADD `poolId` varchar(36) NULL')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` ADD CONSTRAINT `FK_4f644b944f69e48d84d1f740fe6` FOREIGN KEY (`poolId`) REFERENCES `pool`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION')
      await queryRunner.query('ALTER TABLE `pool` ADD CONSTRAINT `FK_394f1a93c0e47745673b72fc959` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `pool` DROP FOREIGN KEY `FK_394f1a93c0e47745673b72fc959`')
      await queryRunner.query('ALTER TABLE `parameter` DROP FOREIGN KEY `FK_4f644b944f69e48d84d1f740fe6`')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` DROP COLUMN `poolId`')
      await queryRunner.query('ALTER TABLE `parameter` DROP COLUMN `date`')
      await queryRunner.query('DROP TABLE `pool`')
    }
}
