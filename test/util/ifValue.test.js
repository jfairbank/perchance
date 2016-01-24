import test from 'ava';
import ifValue from '../../src/util/ifValue';

const valueFunction = () => 'value';
const ifNullFunction = () => 'nully';

test('returns second function value if the value is null', t => {
  t.plan(1);

  t.is(
    ifValue(null, valueFunction, ifNullFunction),
    ifNullFunction()
  );
});

test('returns second function value if the value is undefined', t => {
  t.plan(1);

  t.is(
    ifValue(undefined, valueFunction, ifNullFunction),
    ifNullFunction()
  );
});

test('returns first function value if the value is not null or undefined', t => {
  const values = ['', 'a', 0, 1, true, false, {}, [], NaN];

  t.plan(values.length);

  values.forEach(value => {
    t.is(
      ifValue(value, valueFunction, ifNullFunction),
      valueFunction(),
      `returns value ${value}`
    );
  });
});
