import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (tree) => {
  const iter = (node, parentKey) => node.flatMap((item) => {
    const {
      type, key, value, oldValue, newValue,
    } = item;
    const path = [...parentKey, key].join('.');
    switch (type) {
      case 'deleted':
        return `Property '${path}' was removed`;
      case 'added':
        return `Property '${path}' was added with value: ${getValue(value)}`;
      case 'nested':
        return `${iter(value, [path]).join('\n')}`;
      case 'unchanged':
        return [];
      default:
        return `Property '${path}' was updated. From ${getValue(oldValue)} to ${getValue(newValue)}`;
    }
  });
  return [...iter(tree, [])].join('\n');
};

export default plain;
