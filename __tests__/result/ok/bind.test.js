import { Ok } from '../../../src';
import { half } from '../_helpers';

const value = 42;
const add2 = n => Ok(n + 2);

it('chaining Result returning functions', () => {
  const actual = Ok(value)
    .bind(half)
    .bind(add2)
    .value;

  expect(actual).toBe(23);
});
