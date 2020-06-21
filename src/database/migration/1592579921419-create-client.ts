import { MigrationInterface, QueryRunner } from 'typeorm'

export class createClient1592579921419 implements MigrationInterface {
    name = 'createClient1592579921419'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `client` (`id` varchar(36) NOT NULL, `name` text NOT NULL, `address` text NOT NULL, `cnpj` text NOT NULL, `cellphone` text NOT NULL, `secondCellphone` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `client`')
    }
}
