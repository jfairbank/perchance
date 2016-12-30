import zip from 'lodash/zip';
import { Ok } from '../../src';
import { ERR_ACCESS_ERROR } from '../../src/core/errorTypes';

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
