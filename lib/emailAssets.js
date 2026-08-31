import fs from "fs";
import path from "path";

let cachedLogoSrc = null;
let cachedFaviconSrc = null;

const MIME_TYPES = {
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const LOGO_CANDIDATES = ["logo.png", "logo.webp", "Logo_black.webp"];
const FAVICON_CANDIDATES = ["favicon.webp", "favicon.png"];

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

export function getEmailFaviconSrc() {
  if (!cachedFaviconSrc) {
    cachedFaviconSrc = readEmbeddedImage(FAVICON_CANDIDATES);

    if (!cachedFaviconSrc) {
      console.warn("Email favicon not found in public/assets/img");
    }
  }

  return cachedFaviconSrc;
}

export function getEmailTemplateProps(extraProps = {}) {
  return {
    logoUrl: getEmailLogoSrc(),
    faviconUrl: getEmailFaviconSrc(),
    ...extraProps,
  };
}
