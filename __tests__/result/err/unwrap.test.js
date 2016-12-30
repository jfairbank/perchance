import { Err } from '../../../src';

import {
  ERR_NEED_FUNCTION,
  ERR_UNWRAP_ERR,
} from '../../../src/core/errorTypes';

const error = 'whoops';
const wrapped = Err(error);

it('throws an error without the second function', () => {
  expect(() => wrapped.unwrap()).toThrowError(ERR_UNWRAP_ERR);
});

it('throws an error if the second argument is not a function', () => {
  const args = [42, 'hello', {}, [], NaN, null];

  args.forEach((arg) => {
    expect(() => {
      wrapped.unwrap(null, arg);
    }).toThrowError(ERR_NEED_FUNCTION);
  });
});

it('returns the return value of the second function', () => {
  const actual = wrapped.unwrap(
    v => v,
    message => message.toUpperCase(),
  );

  expect(actual).toBe(error.toUpperCase());
});
