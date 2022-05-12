import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShortTermDataTable1652382779200
  implements MigrationInterface
{
  name = 'CreateShortTermDataTable1652382779200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "short_term_data"
       (
           "voltage"   integer   NOT NULL,
           "power"     integer   NOT NULL,
           "line"      integer   NOT NULL,
           "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
           "meterId"   uuid      NOT NULL,
           CONSTRAINT "PK_bc2432a90fc56fad03400862454" PRIMARY KEY ("line", "timestamp", "meterId")
       )`,
    );
    await queryRunner.query(
      `ALTER TABLE "short_term_data"
          ADD CONSTRAINT "FK_242ecf08a33d24d290e65d64fae" FOREIGN KEY ("meterId") REFERENCES "meter" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "short_term_data"
          DROP CONSTRAINT "FK_242ecf08a33d24d290e65d64fae"`,
    );
    await queryRunner.query(`DROP TABLE "short_term_data"`);
  }
}
