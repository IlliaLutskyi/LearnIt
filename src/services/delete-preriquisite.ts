import prisma from "@/lib/db";

export default async function deletePreriquisite(id: string) {
  try {
    const preriquisit = await prisma.prerequisit.delete({
      where: {
        id: Number(id),
      },
    });

    if (!preriquisit)
      return Response.json(
        { message: "Prerequisite not found" },
        { status: 404 }
      );

    return Response.json(
      { message: "Prerequisite deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message: "Unable to delete preriquisit",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
