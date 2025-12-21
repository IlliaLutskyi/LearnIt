import { optimizeImage } from "@/utils/optimizeImage";
import prisma from "@/lib/db";

export async function UpdateCategory(
  req: Request,
  params: Promise<{ id: string }>
) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const image = formData.get("image") as File;
  const { id } = await params;
  try {
    let optimizedImage;

    if (!id)
      return Response.json(
        { message: "Category ID is missing" },
        { status: 400 }
      );

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      optimizedImage = await optimizeImage(buffer);
    }

    await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(optimizedImage && { image: optimizedImage }),
        ...(name && { name: name.toLowerCase() }),
      },
    });

    return Response.json(
      { message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: "Unable to update category", err: err },
      { status: 500 }
    );
  }
}
