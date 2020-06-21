import { MigrationInterface, QueryRunner } from 'typeorm'

export class createEmployee1592576699945 implements MigrationInterface {
    name = 'createEmployee1592576699945'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `employee` (`id` varchar(36) NOT NULL, `name` text NOT NULL, `address` text NOT NULL, `category` text NOT NULL, `cellphone` text NOT NULL, `secondCellphone` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `employee`')
    }
}
