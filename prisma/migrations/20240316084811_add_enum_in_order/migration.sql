/*
  Warnings:

  - Changed the type of `orderStatus` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentStatus` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('NEW', 'PENDING', 'CALLED', 'NOT_CONTACTED', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "ORDER_PAYMENT_STATUS" AS ENUM ('PAID', 'NOT_PAID', 'POSTAL_PAID', 'CONTACT_PAID');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderStatus",
ADD COLUMN     "orderStatus" "ORDER_STATUS" NOT NULL,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "ORDER_PAYMENT_STATUS" NOT NULL;
