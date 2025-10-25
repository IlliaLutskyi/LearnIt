import prisma from "@/lib/db";
import { Course } from "@/types/create-course";
import { CreateCourseSchema } from "@/features/courses/schemas/create-course-schema";
import z from "zod";

export default async function createCourse(req: Request) {
  const course: Course & { userId: string } = await req.json();
  try {
    const validated = CreateCourseSchema.safeParse(course);

    if (!validated.success) {
      console.log(z.prettifyError(validated.error));
      return Response.json(
        { message: z.prettifyError(validated.error) },
        { status: 400 }
      );
    }
    const isDuplicateSlug = await prisma.course.findUnique({
      where: {
        slug: course.slug,
      },
    });

    if (isDuplicateSlug) {
      return Response.json(
        { message: "Title already exists" },
        { status: 400 }
      );
    }

    await prisma.course.create({
      data: {
        title: course.title,
        slug: course.slug,
        description: course.description,
        skills:
          course.skills.length > 0
            ? {
                create: course.prerequisites.map((prerequisite) => ({
                  content: prerequisite.content,
                })),
              }
            : undefined,
        prerequisites:
          course.prerequisites.length > 0
            ? {
                create: course.prerequisites.map((prerequisite) => ({
                  content: prerequisite.content,
                })),
              }
            : undefined,
        category: {
          connect: { id: Number(course.category.id) },
        },
        user: {
          connect: {
            id: Number(course.userId),
          },
        },
        sectionGroups: {
          create: course.sectionGroups.map((sectionGroup) => ({
            title: sectionGroup.title,
            slug: sectionGroup.slug,
            order: sectionGroup.order,
            sections: {
              create: sectionGroup.sections.map((section) => ({
                title: section.title,
                slug: section.slug,
                order: section.order,
                lessons: {
                  create: section.lessons.map((lesson) => ({
                    title: lesson.title,
                    content: lesson.content,
                    contentType: lesson.contentType,
                    order: lesson.order,
                    videoSource: lesson.videoSource,
                    quiz: lesson.quiz
                      ? {
                          create: {
                            question: lesson.quiz.question,
                            explanation: lesson.quiz.explanation,
                            answers: {
                              createMany: {
                                data: lesson.quiz.answers.map((a) => ({
                                  content: a.content,
                                  isCorrect: a.isCorrect,
                                })),
                              },
                            },
                          },
                        }
                      : undefined,
                  })),
                },
              })),
            },
          })),
        },
      },
    });

    return Response.json(
      { message: "Course created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        message: "Something went wrong, please try again",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
