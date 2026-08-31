import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const src = path.join(ROOT, "styles", "shared", "fonts.css");
const dest = path.join(ROOT, "public", "assets", "css", "shared", "fonts.css");

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log("Synced fonts.css to public/assets/css/shared/fonts.css");
