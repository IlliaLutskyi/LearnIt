import prisma from "@/lib/db";
import { DbPrerequisite } from "@/types";

export default async function updatePrerequisites(req: Request) {
  const data: DbPrerequisite[] = await req.json();
  try {
    await Promise.all(
      data.map(async (prerequisite) => {
        await prisma.prerequisit.update({
          where: {
            id: prerequisite.id,
          },
          data: {
            content: prerequisite.content,
          },
        });
      })
    );

    return Response.json(
      { message: "Prerequisites updated successfully" },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        message: "Unable to update prerequisites",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
