import parseFile from './parsers.js';
import ast from './ast.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedFile1 = parseFile(filepath1);
  const parsedFile2 = parseFile(filepath2);

  const typeResult = ast(parsedFile1, parsedFile2);

  return `{\n${stylish(typeResult).join('\n')}\n}`;
};

export default genDiff;
