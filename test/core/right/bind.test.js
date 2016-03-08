import test from 'ava';

import { isRight, Right } from '../../../src/core/right';
import Left from '../../../src/core/left';
import divide from '../../helpers/divide';

const right = Right(42)
                .bind(divide(2))
                .bind(divide(7));

test('chain bind calls', t => {
  t.is(
    right.value,
    3
  )
});

test('right toString works', t => {
  t.is(
    right.toString(),
    'Right(3)'
  )
});

test('right is right', t => {
  t.true(
    isRight(right)
  )
});
