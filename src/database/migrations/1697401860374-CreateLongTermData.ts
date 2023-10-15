import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateLongTermData1697401860374 implements MigrationInterface {
    name = 'CreateLongTermData1697401860374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "short_term_data" DROP CONSTRAINT "FK_242ecf08a33d24d290e65d64fae"`);
        await queryRunner.query(`CREATE TABLE "long_term_data" ("line" integer NOT NULL, "powerCoefficients" json NOT NULL, "voltageCoefficients" json NOT NULL, "dateFrom" TIMESTAMP NOT NULL, "dateTo" TIMESTAMP NOT NULL, "meterId" uuid NOT NULL, CONSTRAINT "PK_f0fc888aac8efa5a3393101579f" PRIMARY KEY ("line", "dateFrom", "dateTo", "meterId"))`);
        await queryRunner.query(`ALTER TABLE "long_term_data" ADD CONSTRAINT "FK_244dd10c0a8f6683510cd9fb630" FOREIGN KEY ("meterId") REFERENCES "meter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "short_term_data" ADD CONSTRAINT "FK_242ecf08a33d24d290e65d64fae" FOREIGN KEY ("meterId") REFERENCES "meter"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "short_term_data" DROP CONSTRAINT "FK_242ecf08a33d24d290e65d64fae"`);
        await queryRunner.query(`ALTER TABLE "long_term_data" DROP CONSTRAINT "FK_244dd10c0a8f6683510cd9fb630"`);
        await queryRunner.query(`DROP TABLE "long_term_data"`);
        await queryRunner.query(`ALTER TABLE "short_term_data" ADD CONSTRAINT "FK_242ecf08a33d24d290e65d64fae" FOREIGN KEY ("meterId") REFERENCES "meter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
