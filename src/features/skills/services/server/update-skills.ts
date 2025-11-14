import prisma from "@/lib/db";
import { Skill } from "@/types/create-course/skill";

export default async function updateSkills(req: Request) {
  const data: Skill[] = await req.json();
  try {
    await Promise.all(
      data.map(async (skill) => {
        await prisma.skill.update({
          where: {
            id: skill.id,
          },
          data: {
            content: skill.content,
          },
        });
      })
    );

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
