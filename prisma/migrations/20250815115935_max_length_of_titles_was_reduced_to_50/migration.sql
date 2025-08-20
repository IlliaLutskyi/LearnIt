/*
  Warnings:

  - You are about to alter the column `title` on the `Lesson` table. The data in that column could be lost. The data in that column will be cast from `Char(100)` to `Char(50)`.
  - You are about to alter the column `title` on the `Section` table. The data in that column could be lost. The data in that column will be cast from `Char(100)` to `Char(50)`.
  - You are about to alter the column `title` on the `SectionGroup` table. The data in that column could be lost. The data in that column will be cast from `Char(100)` to `Char(50)`.

*/
-- AlterTable
ALTER TABLE "public"."Lesson" ALTER COLUMN "title" SET DATA TYPE CHAR(50);

-- AlterTable
ALTER TABLE "public"."Section" ALTER COLUMN "title" SET DATA TYPE CHAR(50);

-- AlterTable
ALTER TABLE "public"."SectionGroup" ALTER COLUMN "title" SET DATA TYPE CHAR(50);
