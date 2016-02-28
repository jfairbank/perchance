import test from 'ava';
import double from '../../helpers/double';
import Just from '../../../src/core/just';
import Nothing from '../../../src/core/nothing';

const value = 42;

test('returns a new Just', t => {
  const wrapped = Just(value);
  const mapped = wrapped.map(double);

  t.not(wrapped, mapped);
});

test('does not mutate the original Just', t => {
  const wrapped = Just(value);

  wrapped.map(double);

  t.is(wrapped.value, value);
});

test('wraps the mapped value', t => {
  t.is(
    Just(value).map(double).value,
    double(value)
  );
});

test('returns Nothing when mapping to null', t => {
  t.is(
    Just(value).map(() => null),
    Nothing()
  );
});

test('returns Nothing when mapping to undefined', t => {
  t.is(
    Just(value).map(() => undefined),
    Nothing()
  );
});
