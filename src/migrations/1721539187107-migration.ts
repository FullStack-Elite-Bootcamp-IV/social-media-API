import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721539187107 implements MigrationInterface {
    name = 'Migration1721539187107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "postId" character varying NOT NULL, "userId" character varying NOT NULL, "userUserId" uuid, "postPostId" uuid, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Favourites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "userIdUserId" uuid, "postIdPostId" uuid, CONSTRAINT "PK_7515f3b23397a4179847630ceb8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "postId" character varying NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" uuid, "postPostId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("postId" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text, "media" character varying, "isPublic" boolean NOT NULL DEFAULT false, "publicationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "likes" integer NOT NULL DEFAULT '0', "userId" character varying NOT NULL, "userUserId" uuid, CONSTRAINT "PK_cdc670193be6ca43f590dbabcee" PRIMARY KEY ("postId"))`);
        await queryRunner.query(`CREATE TABLE "Chats" ("chatId" uuid NOT NULL DEFAULT uuid_generate_v4(), "user1Id" uuid NOT NULL, "user2Id" uuid NOT NULL, "lastMessage" TIMESTAMP, CONSTRAINT "PK_cf55b28aed23b1b076c192f89de" PRIMARY KEY ("chatId"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" boolean NOT NULL DEFAULT false, "action" "public"."notifications_action_enum" NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, "notificationDate" TIMESTAMP NOT NULL DEFAULT now(), "receptorUserUserId" uuid, "emisorUserUserId" uuid, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Followers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "followerId" character varying NOT NULL, "followingId" character varying NOT NULL, "followDate" TIMESTAMP NOT NULL DEFAULT now(), "followerUserId" uuid NOT NULL, "followingUserId" uuid NOT NULL, CONSTRAINT "PK_6d71b92abdd180a7d9859d75551" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "fullName" character varying(200) NOT NULL, "age" integer, "gender" "public"."User_gender_enum", "profileImage" character varying(255), "coverImage" character varying(255), "description" character varying(500), "college" character varying(100), "workPlace" character varying(100), "location" character varying(100), "personalWebSite" character varying(255), "darkMode" boolean NOT NULL DEFAULT false, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "lastLogoutDate" TIMESTAMP, CONSTRAINT "UQ_58ca35d90f5ca194db65d775889" UNIQUE ("userName"), CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_45f0625bd8172eb9c821c948a0f" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "messageContent" text NOT NULL, "media" character varying(100), "creationTime" TIMESTAMP NOT NULL DEFAULT now(), "user" uuid, "chatId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_7699af221310daf20de0a5139f2" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_f6577e0f10bd794973cfc02544f" FOREIGN KEY ("postPostId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Favourites" ADD CONSTRAINT "FK_739c38b51fd729617ff7ee65dbb" FOREIGN KEY ("userIdUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Favourites" ADD CONSTRAINT "FK_a5add2df79dd8b3383db82882fe" FOREIGN KEY ("postIdPostId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1a1d776480039886645c32c0e15" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_0ddfafc6ae13de3ae3e24b36dd4" FOREIGN KEY ("postPostId") REFERENCES "posts"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_b4855b3fc6710c40dc4eef9cf96" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Chats" ADD CONSTRAINT "FK_29ebdd46ca7a26482aae61bd8a1" FOREIGN KEY ("user1Id") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Chats" ADD CONSTRAINT "FK_64db13a97e3338d4c00f6c6913e" FOREIGN KEY ("user2Id") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_4dab798a12e68d3bee9accce977" FOREIGN KEY ("receptorUserUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_59e255fa626383ccb03a638e49f" FOREIGN KEY ("emisorUserUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD CONSTRAINT "FK_39afc344fa3d4b3ffe58d3427af" FOREIGN KEY ("followerUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Followers" ADD CONSTRAINT "FK_2b09ef261e4f2ea0b70aa300278" FOREIGN KEY ("followingUserId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_e992d71af54f66639d5b90a7cfc" FOREIGN KEY ("user") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "Chats"("chatId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_e992d71af54f66639d5b90a7cfc"`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP CONSTRAINT "FK_2b09ef261e4f2ea0b70aa300278"`);
        await queryRunner.query(`ALTER TABLE "Followers" DROP CONSTRAINT "FK_39afc344fa3d4b3ffe58d3427af"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_59e255fa626383ccb03a638e49f"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_4dab798a12e68d3bee9accce977"`);
        await queryRunner.query(`ALTER TABLE "Chats" DROP CONSTRAINT "FK_64db13a97e3338d4c00f6c6913e"`);
        await queryRunner.query(`ALTER TABLE "Chats" DROP CONSTRAINT "FK_29ebdd46ca7a26482aae61bd8a1"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_b4855b3fc6710c40dc4eef9cf96"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_0ddfafc6ae13de3ae3e24b36dd4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1a1d776480039886645c32c0e15"`);
        await queryRunner.query(`ALTER TABLE "Favourites" DROP CONSTRAINT "FK_a5add2df79dd8b3383db82882fe"`);
        await queryRunner.query(`ALTER TABLE "Favourites" DROP CONSTRAINT "FK_739c38b51fd729617ff7ee65dbb"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_f6577e0f10bd794973cfc02544f"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_7699af221310daf20de0a5139f2"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Followers"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "Chats"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "Favourites"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
