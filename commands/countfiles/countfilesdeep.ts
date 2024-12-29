import * as fs from 'fs/promises';
import * as path from 'path';

export async function countFilesAndFoldersDeep(dirPath: string): Promise<{ files: number; folders: number }> {
  let files = 0;
  let folders = 0;

  async function traverse(currentPath: string) {
    try {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const entryPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
          folders++;
          await traverse(entryPath); // Đệ quy vào thư mục con
        } else if (entry.isFile()) {
          files++;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if ('code' in error && (error.code === 'EPERM' || error.code === 'EACCES')) {
          console.error(`Permission denied: ${currentPath}`);
        } else {
          console.error(`Error reading directory ${currentPath}:`, error.message);
        }
      } else {
        console.error(`Unknown error occurred: ${error}`);
      }
    }
  }

  await traverse(dirPath);
  return { files, folders };
}