// 
import fs from "fs/promises";
import fsn from "fs";
import path from "path";

const dirPath = "C:\\Users\\Rajan chauhan\\Desktop\\Node js excercise";
let files = await fs.readdir(dirPath);

for (let file of files) {
  const filePath = path.join(dirPath, file);
  if ((await fs.lstat(filePath)).isDirectory()) continue;

  let ext = path.extname(file).slice(1);
  if (!ext) continue;

  const extDir = path.join(dirPath, ext);

  // Create directory for extension if it doesn't exist
  if (!fsn.existsSync(extDir)) {
    await fs.mkdir(extDir);
  }

  // Move file into the extension directory
  const destPath = path.join(extDir, file);
  await fs.rename(filePath, destPath);

  console.log(`Moved ${file} to ${ext}/`);
}