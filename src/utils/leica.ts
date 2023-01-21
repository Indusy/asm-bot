import sharp from "sharp";

import imageRaw from "../assets/template.png";

const templateImageSrc = imageRaw.replace(/^data:image\/\w+;base64,/, "");

const imageBuffer = Buffer.from(templateImageSrc, "base64");

export async function leica(imageSrc: Buffer) {
  const background = sharp(imageBuffer);
  const foreground = await sharp(imageSrc)
    .resize({
      width: 1539,
      height: 1539,
      fit: "cover",
    })
    .toBuffer();
  const buffer = await background
    .composite([
      {
        input: foreground,
        left: 1268,
        top: 1268,
      },
    ])
    .toBuffer();
  return buffer;
}
