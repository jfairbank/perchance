import test from 'ava';
import invariant from '../../src/util/invariant';

const errorType = 'MY_ERROR';
const errorMessage = 'My error message';
const functionWillThrow = () => invariant(false, errorMessage, errorType);
const functionWillNotThrow = () => invariant(true, errorMessage, errorType);

test('it throws an error for a falsey value', t => {
  t.throws(functionWillThrow);
});

test('it throws an error with the included error type and message', t => {
  t.throws(functionWillThrow, new RegExp(`${errorType}: ${errorMessage}`));
});

test('it does throw for a truthy value', t => {
  t.doesNotThrow(functionWillNotThrow);
});
