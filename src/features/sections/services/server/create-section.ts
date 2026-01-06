import prisma from "@/lib/db";
import {
  EditSection,
  EditSectionSchema,
} from "../../schemas/edit-section-schema";
import { createSlug } from "@/features/courses/utils/create-slug";

export async function createSection(
  req: Request,
  params: Promise<{ id: string }>
) {
  const data: EditSection = await req.json();
  const { id } = await params;
  try {
    const { success: isValidData, error } = EditSectionSchema.safeParse(data);

    if (!isValidData)
      return Response.json({ message: error.message }, { status: 400 });

    const { _max } = await prisma.section.aggregate({
      where: {
        sectionGroupId: id,
      },
      _max: {
        order: true,
      },
    });

    if (!_max.order)
      return Response.json(
        { message: "Could not find max section order" },
        { status: 500 }
      );

    const section = await prisma.section.create({
      data: {
        title: data.title,
        order: _max.order + 1,
        slug: createSlug(data.title),
        lessons: {
          create: data.lessons.map((lesson, index) => ({
            title: lesson.title,
            contentType: lesson.contentType,
            content: lesson.content,
            order: index + 1,
            codeStyle: lesson.codeStyle,
            videoSource: lesson.videoSource,
            quiz: lesson?.quiz
              ? {
                  create: {
                    question: lesson?.quiz?.question,
                    answers: {
                      create: lesson?.quiz?.answers.map((answer) => ({
                        content: answer.content,
                        isCorrect: answer.isCorrect,
                      })),
                    },
                    explanation: lesson?.quiz?.explanation,
                  },
                }
              : undefined,
          })),
        },
        sectionGroupId: id,
      },
    });

    return Response.json(
      { slug: section.slug, message: "Section created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unable to create section", err: err },
      { status: 500 }
    );
  }
}
