import test from 'ava';
import double from '../../helpers/double';
import { isRight, Right } from '../../../src/core/right';

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
