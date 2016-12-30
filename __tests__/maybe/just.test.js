import zip from 'lodash/zip';
import { Maybe } from '../../src';

const { Just } = Maybe;
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
    expect(Just(null)).toBe(Maybe.Nothing());
  });

  it('wrapping undefined returns Nothing', () => {
    expect(Just(undefined)).toBe(Maybe.Nothing());
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
