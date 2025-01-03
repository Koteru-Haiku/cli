import { Anime } from '../commands/anime/list/Anime.js';
import fs from 'fs';
import path from 'path';

const readAnimeList = (filePath: string): Anime[] => {
  const data = fs.readFileSync(path.resolve(filePath), 'utf-8');
  return JSON.parse(data);
};

const writeAnimeList = (filePath: string, animeList: Anime[]): void => {
  fs.writeFileSync(path.resolve(filePath), JSON.stringify(animeList, null, 2));
};

export { readAnimeList, writeAnimeList };