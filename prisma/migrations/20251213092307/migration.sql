/*
  Warnings:

  - You are about to drop the column `image` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `poster` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "poster" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "image";
