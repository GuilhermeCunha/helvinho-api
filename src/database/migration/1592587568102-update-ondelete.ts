import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateOndelete1592587568102 implements MigrationInterface {
    name = 'updateOndelete1592587568102'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `ph` `ph` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `acid` `acid` double NOT NULL DEFAULT 0')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double NOT NULL DEFAULT 0')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `cyanuric` `cyanuric` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `acid` `acid` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `alkalinity` `alkalinity` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `ph` `ph` double(22) NOT NULL DEFAULT \'0\'')
      await queryRunner.query('ALTER TABLE `parameter` CHANGE `chlorine` `chlorine` double(22) NOT NULL DEFAULT \'0\'')
    }
}
