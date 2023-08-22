/*
  Warnings:

  - Added the required column `ip` to the `HttpLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HttpLog" DROP CONSTRAINT "HttpLog_authorId_fkey";

-- AlterTable
ALTER TABLE "HttpLog" ADD COLUMN     "ip" TEXT NOT NULL,
ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HttpLog" ADD CONSTRAINT "HttpLog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
