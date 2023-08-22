/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BasicRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "role" "BasicRole" NOT NULL,
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Auth_username_key" ON "Auth"("username");
