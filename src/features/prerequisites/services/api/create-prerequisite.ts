import prisma from "@/lib/db";

export default async function createPrerequisite(req: Request) {
  const data = await req.json();
  try {
    const prerequisite = await prisma.prerequisit.create({
      data: {
        content: "Prerequisit",
        course: {
          connect: {
            id: data.courseId,
          },
        },
      },
    });

    if (!prerequisite)
      return Response.json(
        { message: "Could not create prerequisite" },
        { status: 500 }
      );

    return Response.json(
      { prerequisite, message: "Prerequisite created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        message: "Could not create prerequisite",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
