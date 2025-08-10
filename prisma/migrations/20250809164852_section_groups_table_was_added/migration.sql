/*
  Warnings:

  - You are about to drop the column `courseId` on the `Section` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Section` table. The data in that column could be lost. The data in that column will be cast from `Char(300)` to `Char(100)`.
  - Added the required column `sectionGroupId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Section" DROP CONSTRAINT "Section_courseId_fkey";

-- AlterTable
ALTER TABLE "public"."Section" DROP COLUMN "courseId",
ADD COLUMN     "sectionGroupId" INTEGER NOT NULL,
ALTER COLUMN "title" SET DATA TYPE CHAR(100);

-- CreateTable
CREATE TABLE "public"."SectionGroup" (
    "id" SERIAL NOT NULL,
    "title" CHAR(100) NOT NULL,
    "order" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "SectionGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SectionGroup" ADD CONSTRAINT "SectionGroup_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Section" ADD CONSTRAINT "Section_sectionGroupId_fkey" FOREIGN KEY ("sectionGroupId") REFERENCES "public"."SectionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
