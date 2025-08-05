/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `sectionId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_sessionId_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "sessionId",
ADD COLUMN     "sectionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
