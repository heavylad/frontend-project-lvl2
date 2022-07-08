/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const result = fs.readFileSync(getFixturePath('testResult.txt'), 'utf8');

test('testJSON', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});

test('testYAML', () => {
  expect(genDiff('file1.yml', 'file2.yaml')).toEqual(result);
});
