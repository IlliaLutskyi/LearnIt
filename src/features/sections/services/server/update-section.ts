import prisma from "@/lib/db";
import {
  EditSection,
  EditSectionSchema,
} from "../../schemas/edit-section-schema";
import { createSlug } from "@/features/courses/utils/create-slug";

export async function updateSection(
  req: Request,
  params: Promise<{ id: string }>
) {
  const data: EditSection = await req.json();
  const { id } = await params;

  try {
    const { success: isValidData } = EditSectionSchema.safeParse(data);

    if (!isValidData)
      return Response.json({ message: "Invalid data" }, { status: 400 });

    if (!id)
      return Response.json({ message: "Missing section ID" }, { status: 400 });

    const section = await prisma.section.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        slug: createSlug(data.title),
        lessons: {
          deleteMany: {},
          create: data.lessons.map((lesson, index) => {
            return {
              title: lesson.title,
              contentType: lesson.contentType,
              content: lesson.content,
              codeStyle: lesson.codeStyle,
              videoSource: lesson.videoSource,
              quiz: lesson?.quiz
                ? {
                    create: {
                      question: lesson.quiz.question,
                      answers: {
                        createMany: {
                          data: lesson.quiz.answers.map((answer) => {
                            return {
                              content: answer.content,
                              isCorrect: answer.isCorrect,
                            };
                          }),
                        },
                      },
                      explanation: lesson.quiz.explanation,
                    },
                  }
                : undefined,
              order: index + 1,
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
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Could not update section", err: err },
      { status: 500 }
    );
  }
}
