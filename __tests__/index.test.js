/* eslint-disable no-undef */
import readFile from '../src/read.js';
import genDiff from '../src/index.js';

test('testJSON&YAMLFiles', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(readFile('testResultStylish.txt'));
  expect(genDiff('file1.yml', 'file2.yaml')).toEqual(readFile('testResultStylish.txt'));
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(readFile('testResultPlain.txt'));
  expect(genDiff('file1.yml', 'file2.yaml', 'plain')).toEqual(readFile('testResultPlain.txt'));
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(readFile('testResultJSON.txt'));
  expect(genDiff('file1.yml', 'file2.yaml', 'json')).toEqual(readFile('testResultJSON.txt'));
});

test('testErrors', () => {
  expect(() => { genDiff('file1.yml', 'file2.yaml', 'plai'); }).toThrow(new Error('Wrong file format'));
  expect(() => { genDiff('file1.json', 'file2.jso'); }).toThrow(new Error('Wrong file extension'));
});
