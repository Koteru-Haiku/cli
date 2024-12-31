import { promises as fs, constants as fsConstants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function ListBookMarks() {
    const filePath = path.join(__dirname, 'bookmarks.json');

    try {
        await fs.access('bookmarks.json', fsConstants.F_OK);

        const data = await fs.readFile('bookmarks.json', 'utf8');

        if (!data.trim()) {
            console.log('File bookmarks.json is empty.');
            return;
        }

        const bookmarks = data
            .split('\n')
            .filter(line => line.trim())
            .map(line => {
                try {
                    return JSON.parse(line);
                } catch (parseError) {
                    console.error(`Error parsing JSON: ${line}`, parseError);
                    return null;
                }
            })
            .filter(bookmark => bookmark !== null); 

        if (bookmarks.length > 0) {
            bookmarks.forEach(bookmark => {
                console.log(`Name: ${bookmark.name}, URL: ${bookmark.url}`);
            });
        } else {
            console.log('No bookmarks found.');
        }
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('ENOENT')) {
                console.error('File bookmarks.json does not exist. Creating a new one...');
                await fs.writeFile(filePath, JSON.stringify([]));
            } else {
                console.error('Error listing bookmarks:', error.message);
            }
        } else {
            console.error('An unknown error occurred:', error);
        }
    }
}