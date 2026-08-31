import fs from "fs";
import path from "path";

let cachedLogoSrc = null;

const MIME_TYPES = {
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const LOGO_CANDIDATES = ["logo.png", "logo.webp", "Logo_black.webp"];

function readEmbeddedImage(candidates) {
  const imageDir = path.join(process.cwd(), "public", "assets", "img");

  for (const fileName of candidates) {
    const filePath = path.join(imageDir, fileName);

    if (!fs.existsSync(filePath)) {
      continue;
    }

    const extension = path.extname(fileName).toLowerCase();
    const mimeType = MIME_TYPES[extension] || "image/png";
    const buffer = fs.readFileSync(filePath);

    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  }

  return "";
}

export function getEmailLogoSrc() {
  if (!cachedLogoSrc) {
    cachedLogoSrc = readEmbeddedImage(LOGO_CANDIDATES);

    if (!cachedLogoSrc) {
      console.warn("Email logo not found in public/assets/img");
    }
  }

  return cachedLogoSrc;
}

export function getEmailTemplateProps(extraProps = {}) {
  return {
    logoUrl: getEmailLogoSrc(),
    ...extraProps,
  };
}
