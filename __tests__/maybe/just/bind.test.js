import { Just, Nothing } from '../../../src';
import { half } from '../_helpers';

const value = 42;
const add2 = n => Just(n + 2);

it('chaining maybe returning functions', () => {
  const actual = Just(value)
    .bind(half)
    .bind(add2)
    .value;

  expect(actual).toBe(23);
});

it('a Nothing in the chain returns Nothing', () => {
  const actual = Just(5)
    .bind(half)
    .bind(add2);

  expect(actual).toBe(Nothing());
});
