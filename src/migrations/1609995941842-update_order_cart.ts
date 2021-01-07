import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateOrderCart1609995941842 implements MigrationInterface {
  name = 'updateOrderCart1609995941842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "products" TO "cart"`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "cart"`);
    await queryRunner.query(`ALTER TABLE "orders" ADD "cart" jsonb NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "cart"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "cart" text array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "cart" TO "products"`,
    );
  }
}
