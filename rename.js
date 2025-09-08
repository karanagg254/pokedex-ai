const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "src");

function renameFilesRecursively(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      renameFilesRecursively(filePath);
    } else {
      if (file.endsWith(".jsx")) {
        const newPath = filePath.replace(/\.jsx$/, ".tsx");
        fs.renameSync(filePath, newPath);
        console.log(`Renamed: ${filePath} → ${newPath}`);
      } else if (file.endsWith(".js")) {
        const newPath = filePath.replace(/\.js$/, ".ts");
        fs.renameSync(filePath, newPath);
        console.log(`Renamed: ${filePath} → ${newPath}`);
      }
    }
  });
}

renameFilesRecursively(rootDir);
console.log("✅ Renaming completed!");
