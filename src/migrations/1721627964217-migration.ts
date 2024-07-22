import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721627964217 implements MigrationInterface {
    name = 'Migration1721627964217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_4dab798a12e68d3bee9accce977"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_59e255fa626383ccb03a638e49f"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "receptorUserUserId"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "emisorUserUserId"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "receptorUser" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "emisorUser" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50"`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "postId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_75d0daacd2fa5d0db7e01e9eff7" FOREIGN KEY ("receptorUser") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_8813d0c10493422b4570a3f756b" FOREIGN KEY ("emisorUser") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_8813d0c10493422b4570a3f756b"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_75d0daacd2fa5d0db7e01e9eff7"`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "postId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "emisorUser"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "receptorUser"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "emisorUserUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "receptorUserUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_59e255fa626383ccb03a638e49f" FOREIGN KEY ("emisorUserUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_4dab798a12e68d3bee9accce977" FOREIGN KEY ("receptorUserUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
