/*
  Warnings:

  - You are about to drop the column `type` on the `OrderStatusPayment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `OrderStatusState` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[status]` on the table `OrderStatusPayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[status]` on the table `OrderStatusState` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OrderStatusPayment_type_key";

-- DropIndex
DROP INDEX "OrderStatusState_type_key";

-- AlterTable
ALTER TABLE "OrderStatusPayment" DROP COLUMN "type",
ADD COLUMN     "status" "ORDER_STATUS_PAYMENT" NOT NULL DEFAULT 'TEMP';

-- AlterTable
ALTER TABLE "OrderStatusState" DROP COLUMN "type",
ADD COLUMN     "status" "ORDER_STATUS_STATE" NOT NULL DEFAULT 'TEMP';

-- CreateIndex
CREATE UNIQUE INDEX "OrderStatusPayment_status_key" ON "OrderStatusPayment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "OrderStatusState_status_key" ON "OrderStatusState"("status");
