/* eslint-disable no-underscore-dangle */
import { dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

const parseFile = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getPath = () => join(__dirname, '..', '__fixtures__', filename);
  const readFile = () => readFileSync(getPath(filename), 'utf8');
  if (extname(filename) === '.json') {
    return JSON.parse(readFile(filename));
  }
  if (extname(filename) === '.yml' || extname(filename) === '.yaml') {
    return load(readFile(filename));
  }
  return console.log('Wrong file extension');
};

export default parseFile;
