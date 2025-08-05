import { CategoryData } from "@/app/admin/addCategory/page";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const data = await req.formData();
  const name = data.get("name") as string;
  const image = data.get("image") as File;
  try {
    if (!name || !image) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const isDuplicate = await prisma.category.findUnique({
      where: {
        name: name.toLowerCase(),
      },
    });
    if (isDuplicate)
      return Response.json({ message: "Category already exists" });
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:image/png;base64,${buffer.toString("base64")}`;
    await prisma.category.create({
      data: {
        name: name.toLowerCase(),
        image: base64,
      },
    });
    return Response.json({ message: "Category created successfully" });
  } catch (err) {
    return Response.json({ message: "Could not create data" }, { status: 500 });
  }
}
