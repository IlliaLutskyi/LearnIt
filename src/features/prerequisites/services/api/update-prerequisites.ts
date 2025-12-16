import prisma from "@/lib/db";
import { DbPrerequisite } from "@/types";

export default async function updatePrerequisites(req: Request) {
  const data: DbPrerequisite[] = await req.json();
  try {
    if (data.length === 0)
      return Response.json(
        { message: "At least one prerequisite is required" },
        { status: 400 }
      );

    await prisma.course.update({
      where: {
        id: data[0].courseId,
      },
      data: {
        prerequisites: {
          deleteMany: {},
          create: data.map((prerequisite) => ({
            content: prerequisite.content,
          })),
        },
      },
    });

    return Response.json(
      { message: "Prerequisites updated successfully" },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        message: "Unable to update prerequisites",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
