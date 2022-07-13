import _ from 'lodash';

const ast = (parsedFile1, parsedFile2) => {
  const file1Keys = Object.keys(parsedFile1);
  const file2Keys = Object.keys(parsedFile2);
  const allUniqKeys = _.uniq([...file1Keys, ...file2Keys]).sort();

  return allUniqKeys.map((key) => {
    if (file1Keys.includes(key) && !file2Keys.includes(key)) {
      return { type: 'deleted', key, value: parsedFile1[key] };
    } if (!file1Keys.includes(key) && file2Keys.includes(key)) {
      return { type: 'added', key, value: parsedFile2[key] };
    } if (_.isObject(parsedFile1[key]) && _.isObject(parsedFile2[key])) {
      return { type: 'nested', key, value: ast(parsedFile1[key], parsedFile2[key]) };
    } if (parsedFile1[key] === parsedFile2[key]) {
      return { type: 'unchanged', key, value: parsedFile1[key] };
    } return {
      type: 'changed', key, oldValue: parsedFile1[key], newValue: parsedFile2[key],
    };
  });
};

export default ast;
