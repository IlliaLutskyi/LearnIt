import prisma from "@/lib/db";
import { Course } from "@/types/course";

export async function POST(req: Request) {
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
        description: course.description,
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
            order: sectionGroup.order,
            sections: {
              create: sectionGroup.sections.map((section) => ({
                title: section.title,
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
    console.log(course.category.id);
    return Response.json(
      { message: "Something went wrong, please try again" },
      { status: 500 }
    );
  }
}
