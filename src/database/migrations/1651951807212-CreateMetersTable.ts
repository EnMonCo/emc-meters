import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMetersTable1651951807212 implements MigrationInterface {
  name = 'CreateMetersTable1651951807212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status"
       (
           "id"   integer           NOT NULL,
           "name" character varying NOT NULL,
           CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE TABLE "meter"
       (
           "id"           uuid              NOT NULL DEFAULT uuid_generate_v4(),
           "password"     character varying NOT NULL,
           "name"         character varying,
           "serialNumber" character varying NOT NULL,
           "hash"         character varying,
           "userId"       integer,
           "createdAt"    TIMESTAMP         NOT NULL DEFAULT now(),
           "updatedAt"    TIMESTAMP         NOT NULL DEFAULT now(),
           "deletedAt"    TIMESTAMP,
           "statusId"     integer,
           CONSTRAINT "PK_6a2a722edc5f966fa3562638f91" PRIMARY KEY ("id")
       )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bc000e2fe457a0ea9e82b46c4f" ON "meter" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_769270d7ecf3bfd84a6c836a37" ON "meter" ("hash") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_14b17689fddf34d1d0c6e06053" ON "meter" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "meter"
          ADD CONSTRAINT "FK_653f6bc7a50e49e63e8c53f4821" FOREIGN KEY ("statusId") REFERENCES "status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meter"
          DROP CONSTRAINT "FK_653f6bc7a50e49e63e8c53f4821"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_14b17689fddf34d1d0c6e06053"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_769270d7ecf3bfd84a6c836a37"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bc000e2fe457a0ea9e82b46c4f"`,
    );
    await queryRunner.query(`DROP TABLE "meter"`);
    await queryRunner.query(`DROP TABLE "status"`);
  }
}
