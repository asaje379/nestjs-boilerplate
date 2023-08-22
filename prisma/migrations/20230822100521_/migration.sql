-- CreateTable
CREATE TABLE "HttpLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "query" JSONB,
    "params" JSONB,
    "body" JSONB,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "HttpLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HttpLog" ADD CONSTRAINT "HttpLog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
