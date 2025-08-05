/*
  Warnings:

  - You are about to drop the column `videoSourse` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Lesson" DROP COLUMN "videoSourse",
ADD COLUMN     "videoSource" "public"."VideoSource";
