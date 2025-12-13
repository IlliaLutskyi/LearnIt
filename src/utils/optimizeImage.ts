import sharp from "sharp";
export async function optimizeImage(file: Base64URLString | Buffer) {
  let buffer = null;

  if (typeof file == "string") {
    const base64Data = file.replace(/^data:image\/\w+;base64,/, "");

    buffer = Buffer.from(base64Data, "base64");
  } else {
    buffer = file;
  }

  const { data: optimizedImage } = await sharp(buffer)
    .resize(600)
    .webp({ quality: 90 })
    .toBuffer({ resolveWithObject: true });

  const data = `data:image/webp;base64,${optimizedImage.toString("base64")}`;

  return data;
}
