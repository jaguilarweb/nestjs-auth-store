import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategories1682596146764 implements MigrationInterface {
    name = 'CreateCategories1682596146764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_entity_categories_category_entity" ("productEntityId" integer NOT NULL, "categoryEntityId" integer NOT NULL, CONSTRAINT "PK_9ce19fee7e4d05e29af91d430f0" PRIMARY KEY ("productEntityId", "categoryEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24961661db95192c2af8216c43" ON "product_entity_categories_category_entity" ("productEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_85579a4e7b50bbe9d00343b1c1" ON "product_entity_categories_category_entity" ("categoryEntityId") `);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD CONSTRAINT "UQ_ecbe8ebc20a3c7cd594d8e445e1" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "product_entity_categories_category_entity" ADD CONSTRAINT "FK_24961661db95192c2af8216c431" FOREIGN KEY ("productEntityId") REFERENCES "product_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_entity_categories_category_entity" ADD CONSTRAINT "FK_85579a4e7b50bbe9d00343b1c13" FOREIGN KEY ("categoryEntityId") REFERENCES "category_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_entity_categories_category_entity" DROP CONSTRAINT "FK_85579a4e7b50bbe9d00343b1c13"`);
        await queryRunner.query(`ALTER TABLE "product_entity_categories_category_entity" DROP CONSTRAINT "FK_24961661db95192c2af8216c431"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP CONSTRAINT "UQ_ecbe8ebc20a3c7cd594d8e445e1"`);
        await queryRunner.query(`ALTER TABLE "category_entity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category_entity" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_85579a4e7b50bbe9d00343b1c1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24961661db95192c2af8216c43"`);
        await queryRunner.query(`DROP TABLE "product_entity_categories_category_entity"`);
    }

}
