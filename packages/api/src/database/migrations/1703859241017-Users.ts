/**
 * 2023 Copyright P8 Enterprise Components, Inc.
 * All Rights Reserved.
 * Private and Confidential.
 */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1703859241017 implements MigrationInterface {
	name = 'Users1703859241017';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users" ("_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "__crd" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "__upd" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "__ver" integer NOT NULL, "__del" TIMESTAMP WITH TIME ZONE, "email" citext NOT NULL, "password" character varying NOT NULL, "badPasswordAttempts" integer, "isBlocked" boolean NOT NULL DEFAULT false, "passwordAuthEnabled" boolean NOT NULL DEFAULT true, "totpSecret" character varying(32), "totpEnabled" boolean NOT NULL DEFAULT false, "totpLastUsed" character varying(16), "lastLoginAt" TIMESTAMP, "verify" text, "meta" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_9c7b52e58f9afd0d5fa4f848be4" PRIMARY KEY ("_uuid")); COMMENT ON COLUMN "users"."_uuid" IS 'Unique ID'; COMMENT ON COLUMN "users"."__crd" IS 'Created Date'; COMMENT ON COLUMN "users"."__upd" IS 'Updated Date'; COMMENT ON COLUMN "users"."__ver" IS 'Version'; COMMENT ON COLUMN "users"."__del" IS 'Deleted Date'; COMMENT ON COLUMN "users"."email" IS 'User name'; COMMENT ON COLUMN "users"."password" IS 'Password Hash'; COMMENT ON COLUMN "users"."badPasswordAttempts" IS 'Bad password attempts'; COMMENT ON COLUMN "users"."isBlocked" IS 'User is blocked'; COMMENT ON COLUMN "users"."passwordAuthEnabled" IS 'Password authentication enabled'; COMMENT ON COLUMN "users"."totpSecret" IS 'TOTP Secret'; COMMENT ON COLUMN "users"."totpEnabled" IS 'TOTP Enabled'; COMMENT ON COLUMN "users"."totpLastUsed" IS 'TOTP last used'; COMMENT ON COLUMN "users"."lastLoginAt" IS 'Last login timestamp'; COMMENT ON COLUMN "users"."verify" IS 'Verification data'; COMMENT ON COLUMN "users"."meta" IS 'Optional metadata'`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "users"`);
	}
}
