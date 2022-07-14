import { extname } from 'path';
import { load } from 'js-yaml';
import readFile from './read.js';

const parseFile = (filename) => {
  if (extname(filename) === '.json') {
    return JSON.parse(readFile(filename));
  }
  if (extname(filename) === '.yml' || extname(filename) === '.yaml') {
    return load(readFile(filename));
  }
  throw new Error('Wrong file extension');
};

export default parseFile;
