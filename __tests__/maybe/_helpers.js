import { Maybe } from '../../src';

export function double(n) {
  return n * 2;
}

export function half(n) {
  if (n % 2 === 0) {
    return Maybe.Just(n / 2);
  }

  return Maybe.Nothing();
}
