const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(process.cwd(), "public", "assets");

const extensions = [".png", ".jpg", ".jpeg", ".gif"];

async function convertDirectory(dir) {
  const items = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      await convertDirectory(fullPath);
      continue;
    }

    const ext = path.extname(item.name).toLowerCase();

    if (!extensions.includes(ext)) {
      continue;
    }

    const outputPath =
      fullPath.substring(0, fullPath.length - ext.length) + ".webp";

    try {
      await sharp(fullPath)
        .webp({
          quality: 82,
        })
        .toFile(outputPath);

      console.log(
        `✅ ${path.relative(ROOT, fullPath)} -> ${path.relative(
          ROOT,
          outputPath
        )}`
      );
    } catch (error) {
      console.log(`❌ Failed: ${fullPath}`);
      console.log(error.message);
    }
  }
}

convertDirectory(ROOT)
  .then(() => {
    console.log("");
    console.log("=================================");
    console.log("✅ IMAGE CONVERSION COMPLETED");
    console.log("=================================");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });