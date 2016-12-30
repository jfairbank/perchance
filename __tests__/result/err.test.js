import zip from 'lodash/zip';
import { Err } from '../../src';
import { ERR_ACCESS_VALUE } from '../../src/core/errorTypes';

const error = 'whoops';
const result = Err(error);

const toUpperCase = string => string.toUpperCase();

describe('constructor', () => {
  it('wraps an error', () => {
    expect(result.error).toBe(error);
  });

  it('the error cannot be changed', () => {
    expect(() => {
      result.error = 'hello';
    }).toThrow();
  });
});

it('accessing `value` is forbidden', () => {
  expect(() => result.value).toThrowError(ERR_ACCESS_VALUE);
});

it('map returns same Err', () => {
  const mapped = result.map(toUpperCase);

  expect(mapped).toBe(result);
  expect(mapped.error).toBe(error);
});

it('ap returns same Err', () => {
  const applied = result.ap(toUpperCase);

  expect(applied).toBe(result);
  expect(applied.error).toBe(error);
});

it('bind returns same Err', () => {
  const bound = result.bind(toUpperCase);

  expect(bound).toBe(result);
  expect(bound.error).toBe(error);
});

it('withDefault returns the passed-in value', () => {
  expect(result.withDefault('blah')).toBe('blah');
});

it('isOk returns false', () => {
  expect(result.isOk()).toBe(false);
});

it('isErr returns true', () => {
  expect(result.isErr()).toBe(true);
});

it('toString returns a serialized representation', () => {
  const actualValues = [
    result.toString(),
    Err('hi').toString(),
    Err(true).toString(),
    Err({}).toString(),
    Err({ foo: 'bar' }).toString(),
    Err([]).toString(),
    Err([1, 'hi', { foo: 'bar' }]).toString(),
  ];

  const expectedValues = [
    `Err '${error}'`,
    'Err \'hi\'',
    'Err true',
    'Err {}',
    'Err { foo: \'bar\' }',
    'Err []',
    'Err [ 1, \'hi\', { foo: \'bar\' } ]',
  ];

  zip(actualValues, expectedValues).forEach(([actual, expected]) => {
    expect(actual).toBe(expected);
  });
});
