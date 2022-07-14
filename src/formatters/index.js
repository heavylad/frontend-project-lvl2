import stylish from './stylish.js';
import plain from './plain.js';

const formattedResult = (tree, format) => {
  if (format === 'plain') {
    return plain(tree);
  }
  if (format === 'stylish') {
    return stylish(tree);
  }
  throw new Error('Wrong file format');
};

export default formattedResult;
