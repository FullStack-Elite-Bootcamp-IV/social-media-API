import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721621620049 implements MigrationInterface {
    name = 'Migration1721621620049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Favourites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "postId" uuid NOT NULL, CONSTRAINT "PK_7515f3b23397a4179847630ceb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."notifications_action_enum" RENAME TO "notifications_action_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_action_enum" AS ENUM('messages', 'likes', 'comments', 'new_follow_request', 'follow_request_accepted')`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "action" TYPE "public"."notifications_action_enum" USING "action"::"text"::"public"."notifications_action_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_action_enum_old"`);
        await queryRunner.query(`ALTER TABLE "Favourites" ADD CONSTRAINT "FK_6f3e8faa1aa1820c9ca13f4bd11" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Favourites" ADD CONSTRAINT "FK_e55b85cd2e3c957ed054dce23ae" FOREIGN KEY ("postId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Favourites" DROP CONSTRAINT "FK_e55b85cd2e3c957ed054dce23ae"`);
        await queryRunner.query(`ALTER TABLE "Favourites" DROP CONSTRAINT "FK_6f3e8faa1aa1820c9ca13f4bd11"`);
        await queryRunner.query(`CREATE TYPE "public"."notifications_action_enum_old" AS ENUM('comments', 'follow_request_acepted', 'likes', 'messages', 'new_follow_resquest')`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "action" TYPE "public"."notifications_action_enum_old" USING "action"::"text"::"public"."notifications_action_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."notifications_action_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."notifications_action_enum_old" RENAME TO "notifications_action_enum"`);
        await queryRunner.query(`DROP TABLE "Favourites"`);
    }

}
