/*
  Warnings:

  - Changed the type of `specialCashCheck` on the `Settlement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Settlement" DROP COLUMN "specialCashCheck",
ADD COLUMN     "specialCashCheck" INTEGER NOT NULL;
