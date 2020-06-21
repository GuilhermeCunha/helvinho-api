import { MigrationInterface, QueryRunner } from 'typeorm'

export class createReport1592673629941 implements MigrationInterface {
    name = 'createReport1592673629941'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `report` (`id` varchar(36) NOT NULL, `message` text NOT NULL, `status` text NOT NULL, `poolId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `report` ADD CONSTRAINT `FK_9f99c776ba6d2cf3778dbe1472e` FOREIGN KEY (`poolId`) REFERENCES `pool`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `report` DROP FOREIGN KEY `FK_9f99c776ba6d2cf3778dbe1472e`')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('DROP TABLE `report`')
    }
}
