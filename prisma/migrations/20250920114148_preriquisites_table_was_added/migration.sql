-- CreateTable
CREATE TABLE "public"."Preriquisit" (
    "id" SERIAL NOT NULL,
    "content" CHAR(100) NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Preriquisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Preriquisit" ADD CONSTRAINT "Preriquisit_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
