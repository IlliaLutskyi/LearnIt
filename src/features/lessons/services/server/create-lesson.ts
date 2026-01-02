import z from "zod";
import {
  CreateLesson,
  CreateLessonSchema,
} from "../../schemas/create-lesson-schema";
import prisma from "@/lib/db";

export async function createLesson(
  req: Request,
  params: Promise<{ id: string }>
) {
  const data: CreateLesson = await req.json();
  const { id } = await params;
  try {
    const { success: isValidData, error } = CreateLessonSchema.safeParse(data);

    console.log(data);

    if (!isValidData)
      return Response.json({
        message: error.message,
      });

    const { _max } = await prisma.lesson.aggregate({
      where: {
        sectionId: id,
      },
      _max: {
        order: true,
      },
    });

    if (!_max.order)
      return Response.json(
        { message: "Could not find max lesson order" },
        { status: 500 }
      );

    await prisma.lesson.create({
      data: {
        title: data.title,
        contentType: data.contentType,
        codeStyle: data.codeStyle,
        content: data.content,
        videoSource: data.videoSource,
        order: _max.order + 1,

        section: {
          connect: {
            id,
          },
        },
      },
    });

    return Response.json(
      { message: "Lesson was created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Could not create lesson", err },
      { status: 500 }
    );
  }
}
