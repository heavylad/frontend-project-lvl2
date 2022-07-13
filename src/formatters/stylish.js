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

const stylish = (tree, depth = 1) => tree.map((item) => {
  const {
    type, key, value, oldValue, newValue,
  } = item;
  const indent = getIndent(depth);
  const indentForSign = indent.slice(2);
  if (type === 'deleted') {
    return `${indentForSign}- ${key}: ${stringify(value, depth + 1)}`;
  } if (type === 'added') {
    return `${indentForSign}+ ${key}: ${stringify(value, depth + 1)}`;
  } if (type === 'nested') {
    return `${indent}${key}: {\n${stylish(value, depth + 1).join('\n')}\n${indent}}`;
  } if (type === 'unchanged') {
    return `${indent}${key}: ${stringify(value, depth + 1)}`;
  } return [`${indentForSign}- ${key}: ${stringify(oldValue, depth + 1)}`,
    `${indentForSign}+ ${key}: ${stringify(newValue, depth + 1)}`].join('\n');
});

export default stylish;
