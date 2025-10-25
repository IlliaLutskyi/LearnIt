import prisma from "@/lib/db";

export default async function createSkill(req: Request) {
  const data = await req.json();

  try {
    const skill = await prisma.skill.create({
      data: {
        content: "Skill",
        course: {
          connect: {
            id: data.courseId,
          },
        },
      },
    });

    if (!skill)
      return Response.json(
        { message: "Could not create learning outcome" },
        { status: 500 }
      );

    return Response.json(
      { skill, message: "Learning outcome created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        message: "Could not create learning outcome",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
