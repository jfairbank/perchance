import test from 'ava';
import double from '../../helpers/double';
import { isRight, Right } from '../../../src/core/right';
import { isLeft, Left } from '../../../src/core/left';

const value = 42;

test('returns a Right', t => {
  const wrapped = Right(value);
  const mapped = wrapped.map(double);

  t.is(
    mapped.value,
    84
  )
  t.true(
    isRight(mapped)
  )
});

test('returns initial Left if Left', t => {
  const wrapped = Left(0);
  const mapped = wrapped.map(double);

  t.true(
      isLeft(mapped)
  )

  t.is(
    mapped.value,
    0
  )

});
