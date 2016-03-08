import { Right } from '../../src/core/right';
import { Left } from '../../src/core/left';

export default function divide(b){
  return function(a) {
    return b != 0 ? Right(a/b) : Left("cannot divide by 0");
  };
};
