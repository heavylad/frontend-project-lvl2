/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';

const readFile = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getPath = () => resolve(__dirname, '..', '__fixtures__', filename);
  return readFileSync(getPath(), 'utf8');
};

export default readFile;
