import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721626304762 implements MigrationInterface {
    name = 'Migration1721626304762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" boolean NOT NULL DEFAULT false, "action" "public"."notifications_action_enum" NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "notificationDate" TIMESTAMP NOT NULL DEFAULT now(), "receptorUserId" uuid NOT NULL, "emisorUserId" uuid NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_471b110fdc30ff7615c42b602ed" FOREIGN KEY ("receptorUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9d0f181fea44a79755cb793ca45" FOREIGN KEY ("emisorUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9d0f181fea44a79755cb793ca45"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_471b110fdc30ff7615c42b602ed"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
