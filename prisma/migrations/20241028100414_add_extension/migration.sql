-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE CITEXT;
