import prisma from "@/lib/db";

export async function deleteSection(params: Promise<{ id: string }>) {
  const { id } = await params;
  try {
    await prisma.section.delete({ where: { id } });

    return Response.json(
      { message: "Section deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unable to delete section", err: err },
      { status: 500 }
    );
  }
}
