/*
  Warnings:

  - Changed the type of `datatype` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PROPERTY_DATATYPE" AS ENUM ('SELECT', 'MULT', 'CHECKBOX', 'RADIO');

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "datatype",
ADD COLUMN     "datatype" "PROPERTY_DATATYPE" NOT NULL;

-- DropEnum
DROP TYPE "DATATYPE";
