import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateResetPassword1593548121267 implements MigrationInterface {
    name = 'UpdateResetPassword1593548121267'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `product_quantity` CHANGE `value` `value` double NOT NULL')
      await queryRunner.query('ALTER TABLE `reset_password` DROP COLUMN `expiresAt`')
      await queryRunner.query('ALTER TABLE `reset_password` ADD `expiresAt` datetime NOT NULL')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `reset_password` DROP COLUMN `expiresAt`')
      await queryRunner.query('ALTER TABLE `reset_password` ADD `expiresAt` date NOT NULL')
      await queryRunner.query('ALTER TABLE `product_quantity` CHANGE `value` `value` double(22) NOT NULL')
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT '0'")
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT '0'")
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT '0'")
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT '0'")
      await queryRunner.query("ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT '0'")
    }
}
