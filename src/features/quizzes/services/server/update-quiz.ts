import prisma from "@/lib/db";
import { CreateQuiz, CreateQuizSchema } from "../../schemas/create-quiz";
import z from "zod";

export async function updateQuiz(
  req: Request,
  params: Promise<{ id: string }>
) {
  try {
    const data: CreateQuiz = await req.json();
    const { id } = await params;

    const { success: isValidData, error } = CreateQuizSchema.safeParse(data);
    if (!isValidData) {
      return Response.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    }

    const quiz = await prisma.quiz.update({
      where: {
        id,
      },
      data: {
        question: data.question,
        explanation: data.explanation,

        answers: {
          deleteMany: {},

          create: data.answers.map((answer) => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
          })),
        },
      },
    });

    if (!quiz) {
      return Response.json(
        {
          message: "Quiz not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Quiz updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message: err instanceof Error ? err.message : "Unable to update quiz",
      },
      { status: 500 }
    );
  }
}
