-- CreateEnum
CREATE TYPE "Kind" AS ENUM ('CONTENT', 'SERVICE');

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "kind" "Kind" NOT NULL DEFAULT 'CONTENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);
