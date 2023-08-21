-- AlterTable
ALTER TABLE "Auth" ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "originalName" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,
    "downloaded" INTEGER NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);
