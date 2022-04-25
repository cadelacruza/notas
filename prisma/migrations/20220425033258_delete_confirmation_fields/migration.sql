/*
  Warnings:

  - You are about to drop the column `confirmedat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emails` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmedat",
DROP COLUMN "emails";

-- DropEnum
DROP TYPE "emailstatus";

-- DropEnum
DROP TYPE "userstatus";
