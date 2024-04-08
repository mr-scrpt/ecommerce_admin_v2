-- DropForeignKey
ALTER TABLE "CartRow" DROP CONSTRAINT "CartRow_cartId_fkey";

-- AddForeignKey
ALTER TABLE "CartRow" ADD CONSTRAINT "CartRow_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
