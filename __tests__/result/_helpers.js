import { Ok, Err } from '../../src';

export function double(n) {
  return n * 2;
}

export function half(n) {
  if (n % 2 === 0) {
    return Ok(n / 2);
  }

  return Err('I can\'t even');
}
