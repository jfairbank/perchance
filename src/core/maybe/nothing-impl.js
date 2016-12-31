import { alias, invariant } from '../../utils';
import { ERR_ACCESS_VALUE, ERR_UNWRAP_NOTHING } from '../errorTypes';

const Nothing = {
  get value() {
    invariant(
      false,
      'Accessing `value` on `Nothing`',
      ERR_ACCESS_VALUE,
    );
  },

  map() {
    return Nothing;
  },

  unwrap(_, fn) {
    invariant(
      fn !== undefined,
      'Can only unwrap Just',
      ERR_UNWRAP_NOTHING,
    );

    return fn();
  },

  withDefault(value) {
    return value;
  },

  isJust() {
    return false;
  },

  isNothing() {
    return true;
  },

  toString() {
    return 'Nothing';
  },
};

alias(Nothing, ['ap', 'apply', 'then', 'bind', 'flatMap'], 'map');
alias(Nothing, ['inspect'], 'toString');

Object.freeze(Nothing);

export default Nothing;
