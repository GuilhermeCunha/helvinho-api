import {MigrationInterface, QueryRunner} from "typeorm";

export class createUser1592339398810 implements MigrationInterface {
    name = 'createUser1592339398810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `firstName` text NOT NULL, `lastName` text NOT NULL, `age` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `user`");
    }

}
