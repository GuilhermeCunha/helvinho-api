import { MigrationInterface, QueryRunner } from 'typeorm'

export class createUser1592570448484 implements MigrationInterface {
    name = 'createUser1592570448484'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `user` (`id` varchar(36) NOT NULL, `email` text NOT NULL, `username` text NOT NULL, `password` text NOT NULL, `role` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `user`')
    }
}
