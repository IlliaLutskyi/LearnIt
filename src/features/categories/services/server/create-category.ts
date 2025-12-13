import { optimizeImage } from "@/utils/optimizeImage";
import prisma from "@/lib/db";
export default async function createCategory(req: Request) {
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

    const buffer = Buffer.from(await image.arrayBuffer());
    const optimizedImage = await optimizeImage(buffer);

    await prisma.category.create({
      data: {
        name: name.toLowerCase(),
        image: optimizedImage,
      },
    });

    return Response.json({ message: "Category created successfully" });
  } catch (err) {
    return Response.json(
      {
        message: "Could not create data",
        error: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
