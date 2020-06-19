import {MigrationInterface, QueryRunner} from "typeorm";

export class createParameter1592581343112 implements MigrationInterface {
    name = 'createParameter1592581343112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `parameter` (`id` varchar(36) NOT NULL, `chlorine` double NOT NULL DEFAULT 0, `ph` double NOT NULL DEFAULT 0, `alkalinity` double NOT NULL DEFAULT 0, `acid` double NOT NULL DEFAULT 0, `cyanuric` double NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `parameter`");
    }

}
