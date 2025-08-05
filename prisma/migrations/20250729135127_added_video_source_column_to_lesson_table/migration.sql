-- CreateEnum
CREATE TYPE "public"."VideoSource" AS ENUM ('Youtube');

-- AlterTable
ALTER TABLE "public"."Lesson" ADD COLUMN     "videoSourse" "public"."VideoSource";
