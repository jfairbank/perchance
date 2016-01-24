import test from 'ava';
import maybe from '../../src/core/maybe';
import { isJust } from '../../src/core/just';
import Nothing from '../../src/core/nothing';

test('returns Nothing for null', t => {
  t.plan(1);

  t.is(maybe(null), Nothing());
});

test('returns Nothing for undefined', t => {
  t.plan(1);

  t.is(maybe(undefined), Nothing());
});

test('returns Just for other values', t => {
  const values = [0, 1, '', 'hello', false, true, {}, [], NaN];

  t.plan(values.length * 2);

  values.forEach(value => {
    const wrapped = maybe(value);

    t.ok(isJust(wrapped), `value ${value} returns a Just`);
    t.ok(Object.is(wrapped.value, value), `value ${value} is wrapped`);
  });
});
