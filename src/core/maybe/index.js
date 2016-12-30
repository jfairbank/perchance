import Just from './just';
import Nothing from './nothing';
import { ifValue } from '../../utils';

export default {
  Just,
  Nothing,

  of(value) {
    return ifValue(
      value,
      () => Just(value),
      () => Nothing(),
    );
  },
};
