import prisma from "@/lib/db";
import {
  EditSection,
  EditSectionSchema,
} from "../../schemas/edit-section-schema";
import { createSlug } from "@/features/courses/utils/create-slug";

export async function updateSection(
  req: Request,
  params: Promise<{ id: string }>,
) {
  const data: EditSection = await req.json();
  const { id } = await params;

  try {
    const { success: isValidData } = EditSectionSchema.safeParse(data);

    if (!isValidData)
      return Response.json({ message: "Invalid data" }, { status: 400 });

    const lessonsToUpdate = data.lessons.filter(
      (lesson) => lesson.action === "update",
    );
    const lessonsToDelete = data.lessons.filter(
      (lesson) => lesson.action === "delete",
    );
    const lessonsToCreate = data.lessons.filter(
      (lesson) => lesson.action === "create",
    );

    console.log(lessonsToUpdate);
    const section = await prisma.section.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        slug: createSlug(data.title),

        lessons: {
          create: lessonsToCreate.map((lesson) => {
            return {
              title: lesson.title,
              contentType: lesson.contentType,
              content: lesson.content,
              codeStyle: lesson.codeStyle,
              order: lesson.order,
              videoSource: lesson.videoSource,
              quiz: lesson.quiz
                ? {
                    create: {
                      question: lesson.quiz.question,
                      explanation: lesson.quiz.explanation,
                      answers: {
                        create: lesson.quiz.answers.map((answer) => {
                          return {
                            content: answer.content,
                            isCorrect: answer.isCorrect,
                          };
                        }),
                      },
                    },
                  }
                : undefined,
            };
          }),

          update: lessonsToUpdate.map((lesson) => {
            return {
              where: {
                id: lesson.id,
              },
              data: {
                title: lesson.title,
                contentType: lesson.contentType,
                content: lesson.content,
                codeStyle: lesson.codeStyle,
                order: lesson.order,
                videoSource: lesson.videoSource,
                quiz: lesson.quiz
                  ? {
                      update: {
                        question: lesson.quiz.question,
                        explanation: lesson.quiz.explanation,

                        answers: {
                          create: lesson.quiz.answers.map((answer) => {
                            return {
                              content: answer.content,
                              isCorrect: answer.isCorrect,
                            };
                          }),
                        },
                      },
                    }
                  : undefined,
              },
            };
          }),

          deleteMany: lessonsToDelete.map((lesson) => {
            return {
              id: lesson.id,
            };
          }),
        },
      },
    });

    return Response.json(
      {
        sectionSlug: section.slug,
        message: "Section updated successfully",
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err instanceof Error ? err.message : err);
    return Response.json(
      { message: "Could not update section", err: err },
      { status: 500 },
    );
  }
}
