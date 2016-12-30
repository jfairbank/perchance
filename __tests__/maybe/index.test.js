import { Maybe } from '../../src';

describe('Maybe.of', () => {
  it('returns Nothing for null', () => {
    expect(Maybe.of(null)).toBe(Maybe.Nothing());
  });

  it('returns Nothing for undefined', () => {
    expect(Maybe.of(undefined)).toBe(Maybe.Nothing());
  });

  it('returns Just for other values', () => {
    const values = [0, 1, '', 'hello', false, true, {}, []];

    values.forEach((value) => {
      const wrapped = Maybe.of(value);

      expect(wrapped.isJust()).toBe(true);
      expect(wrapped.value).toBe(value);
    });

    const wrappedNaN = Maybe.of(NaN);

    expect(wrappedNaN.isJust()).toBe(true);
    expect(Number.isNaN(wrappedNaN.value)).toBe(true);
  });
});
