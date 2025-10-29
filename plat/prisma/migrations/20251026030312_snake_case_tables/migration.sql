/*
  Warnings:

  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServiceTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "block_kind" AS ENUM ('content', 'service');

-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_serviceTagId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ServiceTag" DROP CONSTRAINT "ServiceTag_blockId_fkey";

-- DropTable
DROP TABLE "public"."Block";

-- DropTable
DROP TABLE "public"."Service";

-- DropTable
DROP TABLE "public"."ServiceTag";

-- DropEnum
DROP TYPE "public"."BlockKind";

-- CreateTable
CREATE TABLE "blocks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "kind" "block_kind" NOT NULL DEFAULT 'content',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "service_tag_id" INTEGER NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_tags" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image_link" TEXT,
    "block_id" INTEGER NOT NULL,

    CONSTRAINT "service_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "services_service_tag_id_idx" ON "services"("service_tag_id");

-- CreateIndex
CREATE INDEX "service_tags_block_id_idx" ON "service_tags"("block_id");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_service_tag_id_fkey" FOREIGN KEY ("service_tag_id") REFERENCES "service_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_tags" ADD CONSTRAINT "service_tags_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
