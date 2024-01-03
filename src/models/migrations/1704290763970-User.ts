import { MigrationInterface, QueryRunner } from "typeorm";

export class User1704290763970 implements MigrationInterface {
    name = 'User1704290763970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "joke" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_2178bf6d2debe372d439360892a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_jokes_joke" ("userId" integer NOT NULL, "jokeId" integer NOT NULL, CONSTRAINT "PK_9c96d6474c65e815b265cb2639d" PRIMARY KEY ("userId", "jokeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ea28ef8714c10fbe97fd12ec26" ON "user_jokes_joke" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6307022dfff2cd4cbc74f027b8" ON "user_jokes_joke" ("jokeId") `);
        await queryRunner.query(`ALTER TABLE "user_jokes_joke" ADD CONSTRAINT "FK_ea28ef8714c10fbe97fd12ec262" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_jokes_joke" ADD CONSTRAINT "FK_6307022dfff2cd4cbc74f027b8b" FOREIGN KEY ("jokeId") REFERENCES "joke"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_jokes_joke" DROP CONSTRAINT "FK_6307022dfff2cd4cbc74f027b8b"`);
        await queryRunner.query(`ALTER TABLE "user_jokes_joke" DROP CONSTRAINT "FK_ea28ef8714c10fbe97fd12ec262"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6307022dfff2cd4cbc74f027b8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea28ef8714c10fbe97fd12ec26"`);
        await queryRunner.query(`DROP TABLE "user_jokes_joke"`);
        await queryRunner.query(`DROP TABLE "joke"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
