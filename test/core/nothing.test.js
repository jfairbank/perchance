import test from 'ava';
import sinon from 'sinon';
import double from '../helpers/double';
import half from '../helpers/half';
import Just from '../../src/core/just';
import Nothing from '../../src/core/nothing';
import { ERR_UNWRAP_NOTHING, ERR_NEED_FUNCTION } from '../../src/core/errorTypes';

const value = 42;

test('map returns Nothing', t => {
  t.is(
    Nothing().map(double),
    Nothing()
  );
});

test('ap returns Nothing', t => {
  t.is(
    Nothing().ap(Just(value)),
    Nothing()
  );
});

test('bind returns Nothing', t => {
  t.is(
    Nothing().bind(double),
    Nothing(),
    'with a normal-returning function'
  );

  t.is(
    Nothing().bind(half),
    Nothing(),
    'with a maybe-returning function'
  );
});

test('unwrap throws an error without the second function', t => {
  t.throws(
    () => Nothing().unwrap(),
    new RegExp(ERR_UNWRAP_NOTHING)
  );
});

test('unwrap throws an error if the second argument is not a function', t => {
  const args = [value, 'hello', {}, [], NaN, null];

  args.forEach(arg => {
    t.throws(
      () => Nothing().unwrap(null, arg),
      new RegExp(ERR_NEED_FUNCTION),
      `with arg ${arg}`
    );
  });
});

test('unwrap returns the return value of the second function', t => {
  t.is(
    Nothing().unwrap(
      v => v,
      () => value
    ),

    value
  );
});

test('does not call the first function', t => {
  const spy = sinon.spy();

  Nothing().unwrap(
    spy,
    () => value
  );

  t.notOk(spy.called);
});
