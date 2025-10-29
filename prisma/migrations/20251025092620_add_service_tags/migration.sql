-- CreateTable
CREATE TABLE "ServiceTag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "blockId" INTEGER NOT NULL,

    CONSTRAINT "ServiceTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceTag_blockId_idx" ON "ServiceTag"("blockId");

-- AddForeignKey
ALTER TABLE "ServiceTag" ADD CONSTRAINT "ServiceTag_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;
