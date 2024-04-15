/*
  Warnings:

  - The values [SELF_DELIVERY,POST_DELIVERY,COURIER_DELIVERY] on the enum `DELIVERY_TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DELIVERY_TYPE_new" AS ENUM ('PICKUP', 'POST', 'COURIER');
ALTER TABLE "Delivery" ALTER COLUMN "deliveryType" TYPE "DELIVERY_TYPE_new" USING ("deliveryType"::text::"DELIVERY_TYPE_new");
ALTER TYPE "DELIVERY_TYPE" RENAME TO "DELIVERY_TYPE_old";
ALTER TYPE "DELIVERY_TYPE_new" RENAME TO "DELIVERY_TYPE";
DROP TYPE "DELIVERY_TYPE_old";
COMMIT;
