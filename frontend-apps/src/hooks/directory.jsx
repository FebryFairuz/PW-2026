import fs from "fs";
import path from "path";

export function GetDirectoryStructure(dirPath, basePath = "") {
  const items = [];
  
  try {
    const files = fs.readdirSync(dirPath);
    
    files.forEach((file) => {
      const fullPath = path.join(dirPath, file);
      const relativePath = basePath ? `${basePath}/${file}` : file;
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        items.push({
          name: file,
          type: "directory",
          path: relativePath, // Full path dengan parent
          children: GetDirectoryStructure(fullPath, relativePath),
        });
      } else {
        items.push({
          name: file,
          type: "file",
          path: relativePath,
        });
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
  
  return items;
}