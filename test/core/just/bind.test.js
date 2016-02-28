import test from 'ava';
import double from '../../helpers/double';
import half from '../../helpers/half';
import Just from '../../../src/core/just';
import Nothing from '../../../src/core/nothing';

const value = 42;
const add2 = n => Just(n + 2);

test('chaining maybe returning functions', t => {
  t.is(
    Just(value)
      .bind(half)
      .bind(add2)
      .value,

    add2(half(value).value).value
  );
});

test('a Nothing in the chain returns Nothing', t => {
  t.is(
    Just(5)
      .bind(half)
      .bind(add2),

    Nothing()
  );
});

test('returns the return value of the passed in function', t => {
  t.is(
    Just(value).bind(double),
    double(value)
  );
});
