import test from 'ava';

import Right from '../../../src/core/right';
import Left from '../../../src/core/left';


const divide = function (b){
  return function(a) {
    return b != 0 ? Right(a/b) : Left("cannot divide by 0");
  };
};
const right = Right(42)
                .bind(divide(2))
                .bind(divide(7));

test('chain bind calls', t => {
  t.is(
    right.value,
    3
  )
});

test('right is right', t => {
  t.is(
    right.toString(),
    'Right(3)'
  )
});
