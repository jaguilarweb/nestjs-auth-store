import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserCustomer1682586622654 implements MigrationInterface {
    name = 'CreateUserCustomer1682586622654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "customerId" integer`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_58ed7461c70fc7cff6861783d3f" UNIQUE ("customerId")`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "role" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_58ed7461c70fc7cff6861783d3f" FOREIGN KEY ("customerId") REFERENCES "customer_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_58ed7461c70fc7cff6861783d3f"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_58ed7461c70fc7cff6861783d3f"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "createdAt"`);
    }

}
