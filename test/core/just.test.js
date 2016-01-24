import test from 'ava';
import Just from '../../src/core/just';
import Nothing from '../../src/core/nothing';

const value = 42;

test('wraps a value', t => {
  t.plan(1);

  t.is(
    Just(value).value,
    value
  );
});

test('the value cannot be changed', t => {
  t.plan(2);

  const j = Just(value);

  t.throws(() => j.value = 'hello');
  t.is(j.value, value);
});

test('wrapping null returns Nothing', t => {
  t.plan(1);

  t.is(Just(null), Nothing());
});

test('wrapping undefined returns Nothing', t => {
  t.plan(1);

  t.is(Just(undefined), Nothing());
});
