const bytesUnit = ['kb', 'mb', 'gb', 'tb'];

export function countBytes(value: number | string) {
  if (typeof value === 'number') return value;

  const _value = value.toLowerCase();

  let i = 1;
  for (const unit of bytesUnit) {
    if (_value.includes(unit)) {
      const _number = +_value.split(unit)[0].trim();
      if (!isNaN(_number)) return _number * Math.pow(1024, i);
    }
    i++;
  }
  return +_value;
}
