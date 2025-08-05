/*
  Warnings:

  - You are about to drop the column `clarification` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Quiz" DROP COLUMN "clarification",
ADD COLUMN     "explanation" CHAR(500);
