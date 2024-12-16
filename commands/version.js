import fs from 'fs';
import path from 'path';

export function showVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
  console.log(`chx-cli phiên bản: ${packageJson.version}`);
}
