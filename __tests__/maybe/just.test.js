import zip from 'lodash/zip';
import { Just, Nothing } from '../../src';
import { double, half } from './_helpers';

const value = 42;
const wrapped = Just(value);

describe('constructor', () => {
  it('wraps a value', () => {
    expect(wrapped.value).toBe(value);
  });

  it('the value cannot be changed', () => {
    expect(() => {
      wrapped.value = 'hello';
    }).toThrow();
  });

  it('wrapping null returns Nothing', () => {
    expect(Just(null)).toBe(Nothing());
  });

  it('wrapping undefined returns Nothing', () => {
    expect(Just(undefined)).toBe(Nothing());
  });
});

describe('map', () => {
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
});

describe('ap', () => {
  it('applies the wrapped function', () => {
    expect(
      wrapped.ap(Just(double)).value,
    ).toBe(
      double(value),
    );
  });
});

describe('then', () => {
  const add2 = n => Just(n + 2);

  it('chaining Maybe returning functions', () => {
    const actual = Just(value)
      .then(half)
      .then(add2)
      .value;

    expect(actual).toBe(23);
  });

  it('a Nothing in the chain returns Nothing', () => {
    const actual = Just(5)
      .then(half)
      .then(add2);

    expect(actual).toBe(Nothing());
  });
});

describe('unwrap', () => {
  it('returns the value', () => {
    expect(wrapped.unwrap()).toBe(value);
  });

  it('returns the return value of the first passed function', () => {
    const actual = wrapped.unwrap(
      v => v * 2,
      () => 'got nothing',
    );

    const expected = value * 2;

    expect(actual).toBe(expected);
  });
});

it('withDefault returns its value', () => {
  expect(wrapped.withDefault('blah')).toBe(value);
});

it('isJust returns true', () => {
  expect(wrapped.isJust()).toBe(true);
});

it('isNothing returns false', () => {
  expect(wrapped.isNothing()).toBe(false);
});

it('toString returns a serialized representation', () => {
  const actualValues = [
    wrapped.toString(),
    Just('hi').toString(),
    Just(true).toString(),
    Just({}).toString(),
    Just({ foo: 'bar' }).toString(),
    Just([]).toString(),
    Just([1, 'hi', { foo: 'bar' }]).toString(),
  ];

  const expectedValues = [
    `Just ${value}`,
    'Just \'hi\'',
    'Just true',
    'Just {}',
    'Just { foo: \'bar\' }',
    'Just []',
    'Just [ 1, \'hi\', { foo: \'bar\' } ]',
  ];

  zip(actualValues, expectedValues).forEach(([actual, expected]) => {
    expect(actual).toBe(expected);
  });
});
