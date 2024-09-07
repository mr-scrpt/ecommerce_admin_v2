/*
  Warnings:

  - You are about to drop the column `postOffice` on the `Delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "postOffice",
ADD COLUMN     "postOfficeId" TEXT;
