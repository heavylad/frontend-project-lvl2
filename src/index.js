import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const parsedFile1 = parseFile(filepath1);
  const parsedFile2 = parseFile(filepath2);
  const file1Keys = Object.keys(parsedFile1);
  const file2Keys = Object.keys(parsedFile2);
  const allUniqKeys = _.uniq([...file1Keys, ...file2Keys]).sort();

  const typeResult = [];

  allUniqKeys.map((key) => {
    if (file1Keys.includes(key) && !file2Keys.includes(key)) {
      typeResult.push({ type: 'deleted', key, value: parsedFile1[key] });
    } else if (!file1Keys.includes(key) && file2Keys.includes(key)) {
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
