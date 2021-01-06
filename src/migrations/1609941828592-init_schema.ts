import { MigrationInterface, QueryRunner } from 'typeorm';

export class initSchema1609941828592 implements MigrationInterface {
  name = 'initSchema1609941828592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "price" integer NOT NULL, "description" text, "shortDesc" text, "status" text NOT NULL, "notes" text, "images" text array NOT NULL, "colors" text array NOT NULL, "sizes" text array NOT NULL, "categories" text array NOT NULL, "tags" text array, "stamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "name" text NOT NULL, "imgUrl" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
