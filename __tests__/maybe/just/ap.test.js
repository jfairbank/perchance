import { Just } from '../../../src';
import { ERR_NEED_OBJECT, ERR_NEED_MAP } from '../../../src/core/errorTypes';
import { double } from '../_helpers';

const value = 42;
const wrappedValue = Just(value);
const wrappedFunction = Just(double);

it('applies a wrapped function to another maybe', () => {
  expect(
    wrappedFunction.ap(wrappedValue).value,
  ).toBe(
    double(value),
  );
});

it('applies a wrapped function to any object with a map method', () => {
  const array = [1, 2, 3];

  expect(
    wrappedFunction.ap(array),
  ).toEqual(
    [2, 4, 6],
  );
});

it('throws an error if an object is not passed', () => {
  expect(() => wrappedFunction.ap(42)).toThrowError(ERR_NEED_OBJECT);
});

it('throws an error if the object does not have a `map` method', () => {
  expect(() => wrappedFunction.ap({})).toThrowError(ERR_NEED_MAP);
});
