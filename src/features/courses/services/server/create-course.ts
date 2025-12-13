import prisma from "@/lib/db";
import { Course } from "@/types/create-course";
import { CreateCourseSchema } from "@/features/courses/schemas/create-course-schema";
import z from "zod";
import { optimizeImage } from "@/utils/optimizeImage";

export default async function createCourse(
  req: Request,
  userId: number | undefined
) {
  const course: Course = await req.json();
  try {
    const validated = CreateCourseSchema.safeParse(course);
    if (!userId)
      return Response.json(
        { message: "Login to create a course" },
        { status: 400 }
      );

    if (!validated.success) {
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
    const optimizeedPoster = await optimizeImage(course.poster);
    const processedSectionGroups = await Promise.all(
      course.sectionGroups.map(async (sectionGroup, sgi) => ({
        title: sectionGroup.title,
        slug: sectionGroup.slug,
        showSectionsOnly: sectionGroup.showSectionsOnly,
        order: sgi + 1,
        sections: {
          create: await Promise.all(
            sectionGroup.sections.map(async (section, si) => ({
              title: section.title,
              slug: section.slug,
              order: si + 1,
              lessons: {
                create: await Promise.all(
                  section.lessons.map(async (lesson, li) => ({
                    title: lesson.title,
                    content:
                      lesson.contentType === "Image" && lesson.content
                        ? await optimizeImage(lesson.content)
                        : lesson.content,
                    contentType: lesson.contentType,
                    order: li + 1,
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
                  }))
                ),
              },
            }))
          ),
        },
      }))
    );

    await prisma.course.create({
      data: {
        poster: optimizeedPoster,
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
            id: userId,
          },
        },
        sectionGroups: {
          create: processedSectionGroups,
        },
      },
    });

    return Response.json(
      { message: "Course created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: "Something went wrong, please try again",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
