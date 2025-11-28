import path from 'path';
import { fileURLToPath } from 'url';

export function getRootDir() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.resolve(__dirname, '../');
}

export function resolveFilePath(...paths) {
    return path.resolve(getRootDir(), ...paths);
}
