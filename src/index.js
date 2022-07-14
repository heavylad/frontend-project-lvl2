import parseFile from './parsers.js';
import ast from './ast.js';
import formattedResult from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parsedFile1 = parseFile(filepath1);
  const parsedFile2 = parseFile(filepath2);

  const astResult = ast(parsedFile1, parsedFile2);

  return formattedResult(astResult, format);
};

export default genDiff;
