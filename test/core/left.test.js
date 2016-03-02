import test from 'ava';
import double from '../helpers/double';
import Left from '../../src/core/left';

const value = 42;

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
