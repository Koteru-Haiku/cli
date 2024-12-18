import fs from 'fs';
import path from 'path';
import { VERSION } from '../constants/version';

export function showVersion() {
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
        console.log(`chx-cli phiên bản: ${VERSION}`);
    }
    catch(error) {
        console.log(`chx-cli phiên bản: ${VERSION}`);
    }
}