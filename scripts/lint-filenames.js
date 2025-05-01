// scripts/lint-filenames.js
import path from "path";

const FILE_NAME_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ALLOWED_EXTENSIONS = [".ts", ".tsx"];

const files = process.argv.slice(2); // pega os arquivos passados via {files}

const invalidFiles = files.filter((filePath) => {
  const ext = path.extname(filePath);
  const filename = path.basename(filePath, ext);
  return ALLOWED_EXTENSIONS.includes(ext) && !FILE_NAME_REGEX.test(filename);
});

if (invalidFiles.length > 0) {
  console.error("❌ Detected invalid filenames (use kebab-case):");
  invalidFiles.forEach((file) => console.error(` - ${file}`));
  process.exit(1);
} else {
  console.log("✅ All staged file names are valid.");
}
