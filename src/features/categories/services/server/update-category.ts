import { optimizeImage } from "@/utils/optimizeImage";
import prisma from "@/lib/db";

export async function UpdateCategory(req: Request, categoryId?: string) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const image = formData.get("image") as File;

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

    const buffer = Buffer.from(await image.arrayBuffer());
    const optimizedImage = await optimizeImage(buffer);

    await prisma.category.update({
      where: {
        id: Number(categoryId),
      },
      data: {
        name: name.toLowerCase(),
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
