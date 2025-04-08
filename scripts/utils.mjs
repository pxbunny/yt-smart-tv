import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

/**
 * Get the project root directory.
 *
 * @returns {string} The project root directory.
 */
export function getRootDir() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '../');
}

/**
 * Resolve a file path relative to the project root directory.
 *
 * @param {string[]} paths A sequence of paths or path segments.
 * @returns {string} The resolved file path.
 */
export function resolveFilePath(...paths) {
  return path.resolve(getRootDir(), ...paths);
}

/**
 * Search for files with a specific extension in a directory recursively.
 *
 * @param {string} dir The directory to search in.
 * @param {string} ext The file extension to search for.
 * @param {number} [level=0] The current level of recursion.
 * @returns {string[]} The list of file paths.
 */
export function searchFilesByExtension(dir, ext, level = 0) {
  const files = fs.readdirSync(dir);
  const results = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      results.push(...searchFilesByExtension(filePath, ext, level + 1));
    } else if (file.endsWith(ext)) {
      results.push(filePath);
    }
  }

  return level === 0 ? results.map((file) => path.relative(dir, file)) : results;
}

/**
 * Create a directory if it does not exist.
 *
 * @param {string} path The directory path.
 */
export function createDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}
