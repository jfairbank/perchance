import test from 'ava';
import double from '../helpers/double';
import { isLeft, Left } from '../../src/core/left';
import { isRight, Right } from '../../src/core/right';
import divide from '../helpers/divide';

const value = 42;
const left = Right(42)
              .bind(divide(0)) // will return left
              .bind(divide(2)); // never called

test('map returns a new Left', t => {
  const wrapped = Left(value);
  const mapped = wrapped.map(double);

  t.not(wrapped, mapped);
});

test('map does not mutate the original Left', t => {
  const wrapped = Left(value);

  wrapped.map(double);

  t.is(wrapped.value, value);
});

test('left is left', t => {
  t.true(
    isLeft(left)
  );
});
