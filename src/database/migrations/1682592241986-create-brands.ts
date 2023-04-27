import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBrands1682592241986 implements MigrationInterface {
    name = 'CreateBrands1682592241986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand_entity" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brand_entity" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "brandId" integer`);
        await queryRunner.query(`ALTER TABLE "brand_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "brand_entity" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brand_entity" ADD CONSTRAINT "UQ_f227d9bf710f5874a54ebe051d7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "brand_entity" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "brand_entity" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD CONSTRAINT "FK_94c17b8c1fa66cebdd177cab550" FOREIGN KEY ("brandId") REFERENCES "brand_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_entity" DROP CONSTRAINT "FK_94c17b8c1fa66cebdd177cab550"`);
        await queryRunner.query(`ALTER TABLE "brand_entity" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "brand_entity" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brand_entity" DROP CONSTRAINT "UQ_f227d9bf710f5874a54ebe051d7"`);
        await queryRunner.query(`ALTER TABLE "brand_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "brand_entity" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "brandId"`);
        await queryRunner.query(`ALTER TABLE "brand_entity" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "brand_entity" DROP COLUMN "created_at"`);
    }

}
