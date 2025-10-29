/*
  Warnings:

  - The `kind` column on the `Block` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BlockKind" AS ENUM ('CONTENT', 'SERVICE');

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "kind",
ADD COLUMN     "kind" "BlockKind" NOT NULL DEFAULT 'CONTENT';

-- DropEnum
DROP TYPE "public"."Kind";
