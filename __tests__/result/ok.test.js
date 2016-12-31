import zip from 'lodash/zip';
import { Ok } from '../../src';
import { ERR_ACCESS_ERROR } from '../../src/core/errorTypes';
import { double, half } from './_helpers';

const value = 42;
const result = Ok(value);

describe('constructor', () => {
  it('wraps a value', () => {
    expect(result.value).toBe(value);
  });

  it('the value cannot be changed', () => {
    expect(() => {
      result.value = 'hello';
    }).toThrow();
  });
});

it('accessing `error` is forbidden', () => {
  expect(() => result.error).toThrowError(ERR_ACCESS_ERROR);
});

describe('map', () => {
  it('returns a new Ok', () => {
    const mapped = result.map(double);

    expect(result).not.toBe(mapped);
  });

  it('does not mutate the original Ok', () => {
    result.map(double);

    expect(result.value).toBe(value);
  });

  it('wraps the mapped value', () => {
    expect(
      result.map(double).value,
    ).toBe(
      double(value),
    );
  });
});

describe('ap', () => {
  it('applies a wrapped function', () => {
    expect(
      result.ap(Ok(double)).value,
    ).toBe(
      double(value),
    );
  });
});

describe('then', () => {
  const add2 = n => Ok(n + 2);

  it('chaining Result returning functions', () => {
    const actual = Ok(value)
      .bind(half)
      .bind(add2)
      .value;

    expect(actual).toBe(23);
  });
});

describe('unwrap', () => {
  it('returns the value', () => {
    expect(result.unwrap()).toBe(value);
  });

  it('returns the return value of the first passed function', () => {
    const actual = result.unwrap(
      v => v * 2,
      () => 'got err',
    );

    const expected = value * 2;

    expect(actual).toBe(expected);
  });
});

it('withDefault returns its value', () => {
  expect(result.withDefault('blah')).toBe(value);
});

it('isOk returns true', () => {
  expect(result.isOk()).toBe(true);
});

it('isErr returns false', () => {
  expect(result.isErr()).toBe(false);
});

it('toString returns a serialized representation', () => {
  const actualValues = [
    result.toString(),
    Ok('hi').toString(),
    Ok(true).toString(),
    Ok({}).toString(),
    Ok({ foo: 'bar' }).toString(),
    Ok([]).toString(),
    Ok([1, 'hi', { foo: 'bar' }]).toString(),
  ];

  const expectedValues = [
    `Ok ${value}`,
    'Ok \'hi\'',
    'Ok true',
    'Ok {}',
    'Ok { foo: \'bar\' }',
    'Ok []',
    'Ok [ 1, \'hi\', { foo: \'bar\' } ]',
  ];

  zip(actualValues, expectedValues).forEach(([actual, expected]) => {
    expect(actual).toBe(expected);
  });
});
