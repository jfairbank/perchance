import { Ok } from '../../../src';
import { ERR_NEED_FUNCTION } from '../../../src/core/errorTypes';

const value = 42;
const wrapped = Ok(value);

it('returns the value', () => {
  expect(wrapped.unwrap()).toBe(value);
});

it('returns the return value of the first passed function', () => {
  const actual = wrapped.unwrap(
    v => v * 2,
    () => 'got err',
  );

  const expected = value * 2;

  expect(actual).toBe(expected);
});

it('throws an error if the second argument is not a function', () => {
  const args = [value, 'hello', {}, [], NaN, null];

  args.forEach((arg) => {
    expect(
      () => wrapped.unwrap(arg),
    ).toThrowError(
      ERR_NEED_FUNCTION,
    );
  });
});
