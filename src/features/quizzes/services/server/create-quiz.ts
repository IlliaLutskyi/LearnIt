import z from "zod";
import { CreateQuiz, CreateQuizSchema } from "../../schemas/create-quiz";
import prisma from "@/lib/db";

export async function createQuiz(
  req: Request,
  params: Promise<{ id: string }>
) {
  const data: CreateQuiz = await req.json();
  const { id } = await params;
  try {
    const { success: isValidData, error } = CreateQuizSchema.safeParse(data);

    if (!isValidData)
      return Response.json({
        message: z.prettifyError(error),
      });

    const { _max } = await prisma.lesson.aggregate({
      where: {
        sectionId: Number(id),
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
        contentType: "Quiz",
        order: _max.order + 1,
        quiz: {
          create: {
            question: data.question,
            explanation: data.explanation,
            answers: {
              create: data.answers.map((answer) => ({
                content: answer.content,
                isCorrect: answer.isCorrect,
              })),
            },
          },
        },
        section: {
          connect: {
            id: Number(id),
          },
        },
      },
    });

    return Response.json(
      { message: "Quiz created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);

    return Response.json(
      { message: "Unable to create quiz", err },
      { status: 500 }
    );
  }
}
