import { Nothing } from '../../src';
import { double, half } from './_helpers';

import {
  ERR_ACCESS_VALUE,
  ERR_NEED_FUNCTION,
  ERR_UNWRAP_NOTHING,
} from '../../src/core/errorTypes';

const value = 42;

it('accessing `value` is forbidden', () => {
  expect(() => Nothing().value).toThrowError(ERR_ACCESS_VALUE);
});

it('map returns Nothing', () => {
  expect(
    Nothing().map(double),
  ).toBe(
    Nothing(),
  );
});

it('ap returns Nothing', () => {
  expect(
    Nothing().ap(double),
  ).toBe(
    Nothing(),
  );
});

it('bind returns Nothing', () => {
  expect(
    Nothing().bind(half),
  ).toBe(
    Nothing(),
  );
});

it('unwrap throws an error without the second function', () => {
  expect(() => Nothing().unwrap()).toThrowError(ERR_UNWRAP_NOTHING);
});

it('unwrap throws an error if the second argument is not a function', () => {
  const args = [value, 'hello', {}, [], NaN, null];

  args.forEach((arg) => {
    expect(() => {
      Nothing().unwrap(null, arg);
    }).toThrowError(ERR_NEED_FUNCTION);
  });
});

it('unwrap returns the return value of the second function', () => {
  const actual = Nothing().unwrap(
    v => v,
    () => value,
  );

  expect(actual).toBe(value);
});

it('withDefault returns the passed in value', () => {
  expect(
    Nothing().withDefault(value),
  ).toBe(
    value,
  );
});

it('isJust returns false', () => {
  expect(Nothing().isJust()).toBe(false);
});

it('isNothing returns true', () => {
  expect(Nothing().isNothing()).toBe(true);
});

it('toString returns "Nothing"', () => {
  expect(Nothing().toString()).toBe('Nothing');
});
