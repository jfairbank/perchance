import Just from '../../src/core/just';
import Nothing from '../../src/core/nothing';

export default function half(n) {
  if (n % 2 === 0) {
    return Just(n / 2);
  }

  return Nothing();
}
