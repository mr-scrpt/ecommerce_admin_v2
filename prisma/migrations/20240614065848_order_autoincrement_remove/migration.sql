-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "orderNo" DROP DEFAULT;
DROP SEQUENCE "Order_orderNo_seq";
