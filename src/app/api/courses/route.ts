import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");
  try {
    if (!page || !limit) {
      return NextResponse.json(
        { message: "Page and limit are missing or invalid" },
        { status: 400 }
      );
    }
    const course = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    return NextResponse.json(course, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
