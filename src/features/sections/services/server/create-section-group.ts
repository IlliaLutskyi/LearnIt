import prisma from "@/lib/db";
import { SectionGroupProperties } from "../../schemas/section-group-properties";

export async function createSectionGroup(
  req: Request,
  params: Promise<{ id: string }>
) {
  const data: SectionGroupProperties = await req.json();
  const { id } = await params;
  try {
  } catch (err) {
    return Response.json(
      { message: "Could not create a section group", err },
      { status: 500 }
    );
  }
}
