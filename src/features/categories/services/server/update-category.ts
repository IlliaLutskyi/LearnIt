import { optimizeImage } from "@/utils/optimizeImage";
import prisma from "@/lib/db";

export async function UpdateCategory(req: Request, categoryId?: string) {
  const data = await req.formData();
  const name = data.get("name") as string;
  const image = data.get("image") as File;

  try {
    if (!categoryId)
      return Response.json(
        { message: "Category ID is missing" },
        { status: 400 }
      );

    if (!name || !image)
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );

    const base64 = Buffer.from(await image.arrayBuffer()).toString("base64");
    const optimizedImage = await optimizeImage(base64);

    await prisma.category.update({
      where: {
        id: Number(categoryId),
      },
      data: {
        name,
        image: optimizedImage,
      },
    });

    return Response.json(
      { message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unable to update category" },
      { status: 500 }
    );
  }
}
