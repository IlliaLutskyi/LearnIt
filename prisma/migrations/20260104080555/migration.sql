-- CreateEnum
CREATE TYPE "State" AS ENUM ('Indevelopment', 'Ready');

-- AlterTable
ALTER TABLE "SectionGroup" ADD COLUMN     "state" "State" NOT NULL DEFAULT 'Ready';
