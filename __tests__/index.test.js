/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const result = readFileSync(getFixturePath('testResult2.txt'), 'utf8');
const result2 = readFileSync(getFixturePath('testResult.txt'), 'utf8');

test('testFlatJSON', () => {
  expect(genDiff('file3.json', 'file4.json')).toEqual(result);
});

test('testFlatYAML', () => {
  expect(genDiff('file3.yml', 'file4.yaml')).toEqual(result);
});

test('testNestedJSON', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(result2);
});

test('testNestedYAML', () => {
  expect(genDiff('file1.yml', 'file2.yaml')).toEqual(result2);
});
