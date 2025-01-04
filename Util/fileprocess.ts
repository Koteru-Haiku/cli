import * as fs from "fs/promises";
import { handleAnswer } from "./Handle.js";

export async function readFile(filePath: string): Promise<string[]> {
  const data = await fs.readFile(filePath, 'utf8');
  return data.split('\n');
}

export async function saveFile(filePath: string, content: string[]): Promise<void> {
  await fs.writeFile(filePath, content.join('\n'), 'utf8');
}

