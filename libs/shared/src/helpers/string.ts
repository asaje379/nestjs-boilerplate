export function upperFirstChar(value: string) {
  return [value.at(0).toUpperCase(), value.substring(1)].join('');
}

export function kebabToCamel(value: string) {
  return value
    .split('-')
    .map((item) => upperFirstChar(item))
    .join('');
}
