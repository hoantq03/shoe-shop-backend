import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1697943711606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "products" (
            "id" character varying NOT NULL,

            "name" character varying(100) NOT NULL,
            "image" character varying(255) NOT NULL ,
            "price" decimal NOT NULL DEFAULT 0,
            "description" character varying NOT NULL,
            "color" character varying NOT NULL,
            
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "created_by" character varying NOT NULL DEFAULT '1',
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_by" character varying NOT NULL DEFAULT '1',
            
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6b7433f907" PRIMARY KEY ("id")
            );
            `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
