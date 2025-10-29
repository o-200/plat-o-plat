-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "serviceTagId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Service_serviceTagId_idx" ON "Service"("serviceTagId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceTagId_fkey" FOREIGN KEY ("serviceTagId") REFERENCES "ServiceTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
