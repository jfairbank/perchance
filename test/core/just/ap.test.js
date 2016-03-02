import test from 'ava';
import double from '../../helpers/double';
import Just from '../../../src/core/just';
import { ERR_NEED_OBJECT, ERR_NEED_MAP } from '../../../src/core/errorTypes';

const value = 42;

test('applies a wrapped function to another maybe', t => {
  const wrappedFunction = Just(double);
  const wrappedValue = Just(value);

  t.is(
    wrappedFunction.ap(wrappedValue).value,
    double(value)
  );
});

test('applies a wrapped function to any object with a map method', t => {
  const wrappedFunction = Just(double);
  const array = [1, 2, 3];

  t.same(
    wrappedFunction.ap(array),
    [2, 4, 6]
  );
});

test('throws an error if there is an object is not passed', t => {
  t.throws(
    () => Just(double).ap(42),
    new RegExp(ERR_NEED_OBJECT)
  );
});

test('throws an error if the object does not have a `map` method', t => {
  t.throws(
    () => Just(double).ap({}),
    new RegExp(ERR_NEED_MAP)
  );
});
