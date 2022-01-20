import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationName1642034396284 implements MigrationInterface {
  name = 'migrationName1642034396284';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."wallet_bank_name_enum" AS ENUM(
                'WEMA_BANK',
                'ACCESS_BANK',
                'STERLING_BANK',
                'FLUTTERWAVE'
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "wallet" (
                "wallet_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "foreign_id" character varying(36) NOT NULL,
                "bank_name" "public"."wallet_bank_name_enum" NOT NULL,
                "account_name" character varying(15) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                CONSTRAINT "REL_72548a47ac4a996cd254b08252" UNIQUE ("user_id"),
                CONSTRAINT "PK_8de7b77bd9e13f461f65937f67a" PRIMARY KEY ("wallet_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "profile_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying(120) NOT NULL,
                "password" character varying(80) NOT NULL,
                "first_name" character varying(50) NOT NULL,
                "last_name" character varying(50) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("profile_id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."profile_currency_enum" AS ENUM('NGN', 'USD', 'GBP')
        `);
    await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "bankAccount" character varying(11) NOT NULL,
                "currency" "public"."profile_currency_enum" NOT NULL DEFAULT 'NGN',
                "bvn" integer NOT NULL,
                "phoneNumber" character varying(20) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                CONSTRAINT "UQ_ff154a53574d86b0d2fa9f1db05" UNIQUE ("bankAccount"),
                CONSTRAINT "REL_d752442f45f258a8bdefeebb2f" UNIQUE ("user_id"),
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "wallet"
            ADD CONSTRAINT "FK_72548a47ac4a996cd254b082522" FOREIGN KEY ("user_id") REFERENCES "user"("profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2" FOREIGN KEY ("user_id") REFERENCES "user"("profile_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_d752442f45f258a8bdefeebb2f2"
        `);
    await queryRunner.query(`
            ALTER TABLE "wallet" DROP CONSTRAINT "FK_72548a47ac4a996cd254b082522"
        `);
    await queryRunner.query(`
            DROP TABLE "profile"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."profile_currency_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "wallet"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."wallet_bank_name_enum"
        `);
  }
}
