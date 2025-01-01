import readlineSync from "readline-sync";
import { handleAnswer } from "../utils/Handle.js";

export async function readFile(filePath: string): Promise<string[]> {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data.split('\n');
  } catch (error) {
    throw new Error(`Failed to read file: ${(error as Error).message}`);
  }
}

export async function saveFile(filePath: string, content: string[]): Promise<void> {
  try {
    await fs.writeFile(filePath, content.join('\n'), 'utf8');
  } catch (error) {
    throw new Error(`Failed to save file: ${(error as Error).message}`);
  }
}

export async function editFile(content: string[]): Promise<string[]> {
  let editing = true;
  while (editing) {
    const action = readlineSync.question('Choose action (add/edit/delete/save/exit): ');
    switch (action) {
      case 'add': {
        const newLine = readlineSync.question('Add line: ');
        content.push(newLine);
        break;
      }
      case 'edit': {
        const editLineInput = readlineSync.question('Line number to edit: ');
        const editLine = parseInt(editLineInput, 10) - 1;
        if (!isNaN(editLine) && editLine >= 0 && editLine < content.length) {
          content[editLine] = readlineSync.question('New content: ');
        } else {
          await handleAnswer(false, 'Invalid line number');
        }
        break;
      }
      case 'delete': {
        const deleteLineInput = readlineSync.question('Line number to delete: ');
        const deleteLine = parseInt(deleteLineInput, 10) - 1;
        if (!isNaN(deleteLine) && deleteLine >= 0 && deleteLine < content.length) {
          content.splice(deleteLine, 1);
        } else {
          await handleAnswer(false, 'Invalid line number');
        }
        break;
      }
      case 'save':
        return content;
      case 'exit':
        editing = false;
        break;
      default:
        console.log('Invalid action');
    }
  }
  return content;
}