import zip from 'lodash/zip';
import { Ok, Err } from '../../src';
import { ERR_ACCESS_VALUE, ERR_UNWRAP_ERR } from '../../src/core/errorTypes';

const error = 'whoops';
const result = Err(error);

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

describe('map', () => {
  it('returns same Err', () => {
    const toUpperCase = string => string.toUpperCase();
    const mapped = result.map(toUpperCase);

    expect(mapped).toBe(result);
    expect(mapped.error).toBe(error);
  });
});

describe('ap', () => {
  it('returns same Err', () => {
    const toUpperCase = string => string.toUpperCase();
    const applied = result.ap(Ok(toUpperCase));

    expect(applied).toBe(result);
    expect(applied.error).toBe(error);
  });
});

describe('then', () => {
  it('returns same Err', () => {
    const toUpperCase = string => Ok(string.toUpperCase());
    const newResult = result.then(toUpperCase);

    expect(newResult).toBe(result);
    expect(newResult.error).toBe(error);
  });
});

describe('unwrap', () => {
  it('throws an error without the second function', () => {
    expect(() => result.unwrap()).toThrowError(ERR_UNWRAP_ERR);
  });

  it('returns the return value of the second function', () => {
    const actual = result.unwrap(
      v => v,
      message => message.toUpperCase(),
    );

    expect(actual).toBe(error.toUpperCase());
  });
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
