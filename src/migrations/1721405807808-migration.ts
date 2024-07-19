import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721405807808 implements MigrationInterface {
    name = 'Migration1721405807808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "status" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_action_enum" AS ENUM('messages', 'likes', 'comments', 'follows')`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "action" "public"."notifications_action_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "title" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "description" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "UQ_8813d0c10493422b4570a3f756b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "UQ_8813d0c10493422b4570a3f756b" UNIQUE ("emisorUser")`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "action"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_action_enum"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "type" character varying(20) NOT NULL`);
    }

}
