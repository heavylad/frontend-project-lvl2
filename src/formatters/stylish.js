import _ from 'lodash';

const getIndent = (depth, indent = '    ') => indent.repeat(depth);

const stringify = (value, depth) => {
  const indent = getIndent(depth);
  const indentForClosing = getIndent(depth - 1);
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const nestedValue = keys.map((key) => {
    if (_.isObject(value[key])) {
      return `${indent}${key}: ${stringify(value[key], depth + 1)}`;
    }
    return `${indent}${key}: ${value[key]}`;
  });
  return ['{', ...nestedValue, `${indentForClosing}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => node.map((item) => {
    const {
      type, key, value, oldValue, newValue,
    } = item;
    const indent = getIndent(depth);
    const indentForSign = indent.slice(2);
    switch (type) {
      case 'deleted':
        return `${indentForSign}- ${key}: ${stringify(value, depth + 1)}`;
      case 'added':
        return `${indentForSign}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'nested':
        return `${indent}${key}: {\n${iter(value, depth + 1).join('\n')}\n${indent}}`;
      case 'unchanged':
        return `${indent}${key}: ${stringify(value, depth + 1)}`;
      default:
        return [`${indentForSign}- ${key}: ${stringify(oldValue, depth + 1)}`,
          `${indentForSign}+ ${key}: ${stringify(newValue, depth + 1)}`].join('\n');
    }
  });
  return `{\n${iter(tree, 1).join('\n')}\n}`;
};

export default stylish;
