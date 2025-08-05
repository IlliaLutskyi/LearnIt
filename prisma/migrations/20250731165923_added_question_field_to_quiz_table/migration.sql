/*
  Warnings:

  - Added the required column `question` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Quiz" ADD COLUMN     "question" CHAR(500) NOT NULL;
