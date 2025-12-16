import prisma from "@/lib/db";
import { DbSkill } from "@/types";

export default async function updateSkills(req: Request) {
  const data: DbSkill[] = await req.json();
  try {
    if (data.length === 0)
      return Response.json(
        { message: "At least one skill is required" },
        { status: 400 }
      );

    await prisma.course.update({
      where: {
        id: data[0].courseId,
      },
      data: {
        skills: {
          deleteMany: {},
          create: data.map((skill) => ({
            content: skill.content,
          })),
        },
      },
    });

    return Response.json(
      { message: "Skills updated successfully" },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        message: "Unable to update skills",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
