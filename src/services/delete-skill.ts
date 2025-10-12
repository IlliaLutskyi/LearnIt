import prisma from "@/lib/db";

export default async function deleteSkill(id: string) {
  try {
    const skill = await prisma.skill.delete({
      where: {
        id: Number(id),
      },
    });

    if (!skill)
      return Response.json({ message: "Skill not found" }, { status: 404 });

    return Response.json(
      { message: "Skill deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message: "Unable to delete skill",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
