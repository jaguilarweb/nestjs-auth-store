import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFields1682509319296 implements MigrationInterface {
    name = 'AddFields1682509319296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "created_at"`);
    }

}
