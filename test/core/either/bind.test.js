import test from 'ava';

import { isRight, Right } from '../../../src/core/right';
import either from '../../../src/core/either';
import { isLeft, Left } from '../../../src/core/left';
import divide from '../../helpers/divide';

const right = either(42)
                .bind(divide(2))
                .bind(divide(7));

const left = either(42)
                .bind(divide(0))
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

test('left is left', t => {
  t.true(
    isLeft(left)
  )
});
