import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

export async function AddBookMarks(name: string, url: string) {
    const filePath = path.join(__dirname, 'bookmarks.json');

    try {
        try {
            await fs.access(filePath);
        } catch {
            await fs.writeFile(filePath, '');
        }

        const bookmark = { name, url };

        await fs.appendFile(filePath, JSON.stringify(bookmark) + '\n');
        console.log('Bookmark added successfully.');
        console.log(`File will be created at: ${filePath}`);
    } catch (error) {
        console.error('Error adding bookmark:', (error as Error).message);
    }
}