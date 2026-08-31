import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const LOGO_CANDIDATES = [
  path.join(ROOT, "public", "assets", "img", "logo.png"),
  path.join(ROOT, "public", "assets", "img", "logo.webp"),
  path.join(ROOT, "emails", "assets", "logo.png"),
];

const MIME_TYPES = {
  ".png": "image/png",
  ".webp": "image/webp",
};

let logoPath = "";

for (const candidate of LOGO_CANDIDATES) {
  if (fs.existsSync(candidate)) {
    logoPath = candidate;
    break;
  }
}

if (!logoPath) {
  console.error("Email logo source not found.");
  process.exit(1);
}

const extension = path.extname(logoPath).toLowerCase();
const mimeType = MIME_TYPES[extension] || "image/png";
const base64 = fs.readFileSync(logoPath).toString("base64");

const output = `export const EMAIL_LOGO_CID = "redspider-logo";
export const EMAIL_LOGO_MIME = "${mimeType}";
export const EMAIL_LOGO_BASE64 = "${base64}";
`;

fs.writeFileSync(path.join(ROOT, "lib", "emailLogoData.js"), output);

console.log(`Generated lib/emailLogoData.js from ${logoPath}`);
