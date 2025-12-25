import prisma from "@/lib/db";

export async function deleteSectionGroup(params: Promise<{ id: string }>) {
  const { id } = await params;
  try {
    if (!id)
      return Response.json(
        { message: "Section group ID is missing" },
        { status: 400 }
      );

    await prisma.sectionGroup.delete({ where: { id: Number(id) } });

    return Response.json(
      { message: "Section group deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unable to delete section group", err: err },
      { status: 500 }
    );
  }
}
