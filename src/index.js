/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath1 = (filepath1) => path.join(__dirname, '..', '__fixtures__', filepath1);
  const getFixturePath2 = (filepath2) => path.join(__dirname, '..', '__fixtures__', filepath2);
  const parsedFile1 = JSON.parse(fs.readFileSync(getFixturePath1(filepath1), 'utf8'));
  const parsedFile2 = JSON.parse(fs.readFileSync(getFixturePath2(filepath2), 'utf8'));
  const parsedFile1Keys = Object.keys(parsedFile1);
  const parsedFile2Keys = Object.keys(parsedFile2);
  const allUniqKeys = _.uniq([...parsedFile1Keys, ...parsedFile2Keys]).sort();

  const typeResult = [];

  allUniqKeys.map((key) => {
    if (parsedFile1Keys.includes(key) && !parsedFile2Keys.includes(key)) {
      typeResult.push({ type: 'deleted', key, value: parsedFile1[key] });
    } else if (!parsedFile1Keys.includes(key) && parsedFile2Keys.includes(key)) {
      typeResult.push({ type: 'inserted', key, value: parsedFile2[key] });
    } else if (parsedFile1[key] === parsedFile2[key]) {
      typeResult.push({ type: 'unchanged', key, value: parsedFile1[key] });
    } else {
      typeResult.push({
        type: 'changed', key, oldValue: parsedFile1[key], newValue: parsedFile2[key],
      });
    }
    return typeResult;
  });

  const result = [];

  typeResult.map((item) => {
    const {
      type, key, value, oldValue, newValue,
    } = item;
    if (type === 'deleted') {
      result.push(`- ${key}: ${value}`);
    } else if (item.type === 'inserted') {
      result.push(`+ ${key}: ${value}`);
    } else if (item.type === 'unchanged') {
      result.push(`  ${key}: ${value}`);
    } else {
      result.push(`- ${key}: ${oldValue}`);
      result.push(`+ ${key}: ${newValue}`);
    }
    return result;
  });

  const finalResult = result.join('\n  ');

  return `{\n  ${finalResult}\n}`;
};

export default genDiff;
