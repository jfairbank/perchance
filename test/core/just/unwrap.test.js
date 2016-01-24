import test from 'ava';
import sinon from 'sinon';
import Just from '../../../src/core/just';
import { ERR_NEED_FUNCTION } from '../../../src/core/errorTypes';

const value = 42;

test('returns the value', t => {
  t.plan(1);
  t.is(Just(value).unwrap(), value);
});

test('returns the return value of the first passed function', t => {
  t.plan(1);

  t.is(
    Just(value).unwrap(
      v => v * 2,
      () => 'got nothing'
    ),

    value * 2
  );
});

test('does not call the second function', t => {
  t.plan(1);

  const spy = sinon.spy();

  Just(value).unwrap(
    v => v,
    spy
  );

  t.notOk(spy.called);
});

test('throws an error if the second argument is not a function', t => {
  const args = [value, 'hello', {}, [], NaN, null];

  t.plan(args.length);

  args.forEach(arg => {
    t.throws(
      () => Just(value).unwrap(arg),
      new RegExp(ERR_NEED_FUNCTION),
      `with arg ${arg}`
    );
  });
});
