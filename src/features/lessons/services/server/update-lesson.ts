import {
  CreateLesson,
  CreateLessonSchema,
} from "@/features/lessons/schemas/create-lesson-schema";
import prisma from "@/lib/db";
import z from "zod";

export async function updateLesson(req: Request) {
  const data: CreateLesson & { id: string } = await req.json();
  try {
    const { success: isValidData, error } = CreateLessonSchema.safeParse(data);

    if (!isValidData) {
      return Response.json(
        {
          message: z.prettifyError(error),
        },
        { status: 400 }
      );
    }
    const lesson = await prisma.lesson.update({
      where: {
        id: Number(data.id),
      },
      data: {
        title: data.title,
        content: data.content,
        contentType: data.contentType,
        videoSource: data.videoSource,
      },
    });
    if (!lesson) {
      return Response.json(
        {
          message: "Lesson not found",
        },
        { status: 500 }
      );
    }

    return Response.json(
      { lesson, message: "Lesson updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message: err instanceof Error ? err.message : "Unable to update lesson",
      },
      { status: 500 }
    );
  }
}
