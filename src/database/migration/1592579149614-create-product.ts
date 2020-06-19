import {MigrationInterface, QueryRunner} from "typeorm";

export class createProduct1592579149614 implements MigrationInterface {
    name = 'createProduct1592579149614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `product` (`id` varchar(36) NOT NULL, `name` text NOT NULL, `unit` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `product`");
    }

}
