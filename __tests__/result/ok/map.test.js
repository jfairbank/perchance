import { Ok } from '../../../src';
import { double } from '../_helpers';

const value = 42;
const wrapped = Ok(value);

it('returns a new Ok', () => {
  const mapped = wrapped.map(double);

  expect(wrapped).not.toBe(mapped);
});

it('does not mutate the original Ok', () => {
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
