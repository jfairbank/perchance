import { Just, Nothing } from '../../../src';
import { double } from '../_helpers';

const value = 42;
const wrapped = Just(value);

it('returns a new Just', () => {
  const mapped = wrapped.map(double);

  expect(wrapped).not.toBe(mapped);
});

it('does not mutate the original Just', () => {
  wrapped.map(double);

  expect(wrapped.value).toBe(value);
});

it('wraps the mapped value', () => {
  expect(
    wrapped.map(double).value,
  ).toBe(
    double(value),
  );
});

it('returns Nothing when mapping to null', () => {
  expect(
    wrapped.map(() => null),
  ).toBe(
    Nothing(),
  );
});

it('returns Nothing when mapping to undefined', () => {
  expect(
    wrapped.map(() => undefined),
  ).toBe(
    Nothing(),
  );
});
