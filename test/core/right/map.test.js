import test from 'ava';
import double from '../../helpers/double';
import Right from '../../../src/core/right';

const value = 42;

test('returns a new Right', t => {
  const wrapped = Right(value);
  const mapped = wrapped.map(double);

  t.not(wrapped, mapped);
});
