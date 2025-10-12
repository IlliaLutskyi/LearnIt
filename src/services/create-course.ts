import prisma from "@/lib/db";
import { Course } from "@/types/create-course";

export default async function createCourse(req: Request) {
  const course: Course & { userId: string } = await req.json();
  try {
    if (!course.userId)
      return Response.json({ message: "UserId is missing" }, { status: 400 });

    if (!course.title || !course.category || !course.description)
      return Response.json(
        { message: "Please fill all the fields in the previous step" },
        { status: 400 }
      );

    if (course.sectionGroups.length === 0)
      return Response.json(
        { message: "Please add at least one section group" },
        { status: 400 }
      );

    if (
      course.sectionGroups.some(
        (sectionGroup) => sectionGroup.sections.length === 0
      )
    )
      return Response.json(
        { message: "Please add at least one section in each section group" },
        { status: 400 }
      );

    if (course.sectionGroups.some((sectionGroup) => !sectionGroup.title))
      return Response.json(
        { message: "Please add a title to each section group" },
        { status: 400 }
      );

    if (
      course.sectionGroups.some((sectionGroup) =>
        sectionGroup.sections.some((section) => !section.title)
      )
    )
      return Response.json(
        { message: "Please add a title to each section" },
        { status: 400 }
      );

    await prisma.course.create({
      data: {
        title: course.title,
        slug: course.slug || course.title.replace(/\s+/g, "-").toLowerCase(),
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
            slug:
              sectionGroup.slug ||
              sectionGroup.title.replace(/\s+/g, "-").toLowerCase(),
            order: sectionGroup.order,
            sections: {
              create: sectionGroup.sections.map((section) => ({
                title: section.title,
                slug:
                  section.slug ||
                  section.title.replace(/\s+/g, "-").toLowerCase(),
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
