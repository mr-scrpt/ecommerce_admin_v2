-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_receiverId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "receiverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Receiver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
