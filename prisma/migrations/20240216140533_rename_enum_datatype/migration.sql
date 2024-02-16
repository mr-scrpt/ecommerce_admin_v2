/*
  Warnings:

  - The values [select,mult,checkbox,radio] on the enum `DATATYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DATATYPE_new" AS ENUM ('SELECT', 'MULT', 'CHECKBOX', 'RADIO');
ALTER TABLE "Option" ALTER COLUMN "datatype" TYPE "DATATYPE_new" USING ("datatype"::text::"DATATYPE_new");
ALTER TYPE "DATATYPE" RENAME TO "DATATYPE_old";
ALTER TYPE "DATATYPE_new" RENAME TO "DATATYPE";
DROP TYPE "DATATYPE_old";
COMMIT;
