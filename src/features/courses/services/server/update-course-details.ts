import prisma from "@/lib/db";
import {
  CreateGeneralInfo,
  CreateGeneralInfoSchema,
} from "../../schemas/create-general-info-schema";

type Params = {
  params: Promise<{
    id: string;
  }>;
};
export default async function updateCourseDetails(
  req: Request,
  { params }: Params
) {
  const { id } = await params;
  const data: CreateGeneralInfo = await req.json();
  const isValidData = CreateGeneralInfoSchema.safeParse(data);
  try {
    if (!isValidData.success) {
      return Response.json({ message: "Invalid data" }, { status: 400 });
    }
    const exists = await prisma.course.findFirst({
      where: {
        title: data.title,
      },
    });

    if (exists) {
      return Response.json(
        { message: "Title already exists" },
        { status: 400 }
      );
    }

    const course = await prisma.course.update({
      where: {
        id: Number(id),
      },
      data: {
        category: {
          connect: {
            id: parseInt(data.category.id),
          },
        },
        description: data.description,
        title: data.title,
        slug: data.title
          .toLowerCase()
          .trim()
          .replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`\s]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      },
    });

    if (!course) {
      return Response.json(
        { message: "Could not find course" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Course updated successfully", slug: course.slug },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        message: "Could not edit course, please try again",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
