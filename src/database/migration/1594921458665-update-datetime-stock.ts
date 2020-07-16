import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateDatetimeStock1594921458665 implements MigrationInterface {
    name = 'updateDatetimeStock1594921458665'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `product_quantity` CHANGE `value` `value` double NOT NULL')
      await queryRunner.query('ALTER TABLE `stock` DROP COLUMN `date`')
      await queryRunner.query('ALTER TABLE `stock` ADD `date` datetime NOT NULL')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `stock` DROP COLUMN `date`')
      await queryRunner.query('ALTER TABLE `stock` ADD `date` date NOT NULL')
      await queryRunner.query('ALTER TABLE `product_quantity` CHANGE `value` `value` double(22) NOT NULL')
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT '0'")
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT '0'")
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT '0'")
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT '0'")
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT '0'")
    }
}
