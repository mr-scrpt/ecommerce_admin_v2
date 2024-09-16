/*
  Warnings:

  - You are about to drop the column `orderStatus` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderStatusPaymentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderStatusStateId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ORDER_STATUS_STATE" AS ENUM ('TEMP', 'NEW', 'PENDING', 'CALLED', 'NOT_CONTACTED', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "ORDER_STATUS_PAYMENT" AS ENUM ('TEMP', 'PAID', 'NOT_PAID', 'POSTAL_PAID', 'CONTACT_PAID');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderStatus",
DROP COLUMN "paymentStatus",
ADD COLUMN     "orderStatusPaymentId" TEXT NOT NULL,
ADD COLUMN     "orderStatusStateId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ORDER_PAYMENT_STATUS";

-- DropEnum
DROP TYPE "ORDER_STATUS";

-- CreateTable
CREATE TABLE "OrderStatusState" (
    "id" TEXT NOT NULL,
    "type" "ORDER_STATUS_STATE" NOT NULL DEFAULT 'TEMP',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderStatusState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderStatusPayment" (
    "id" TEXT NOT NULL,
    "type" "ORDER_STATUS_PAYMENT" NOT NULL DEFAULT 'TEMP',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderStatusPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderStatusState_type_key" ON "OrderStatusState"("type");

-- CreateIndex
CREATE UNIQUE INDEX "OrderStatusPayment_type_key" ON "OrderStatusPayment"("type");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderStatusStateId_fkey" FOREIGN KEY ("orderStatusStateId") REFERENCES "OrderStatusState"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderStatusPaymentId_fkey" FOREIGN KEY ("orderStatusPaymentId") REFERENCES "OrderStatusPayment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
