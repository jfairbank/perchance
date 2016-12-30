import isFunction from 'lodash/isFunction';
import { alias, invariant } from '../../utils';

import {
  ERR_ACCESS_VALUE,
  ERR_NEED_FUNCTION,
  ERR_UNWRAP_NOTHING,
} from '../errorTypes';

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

    invariant(
      isFunction(fn),
      'Need function to unwrap Nothing',
      ERR_NEED_FUNCTION,
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

alias(Nothing, ['fmap', 'ap', 'apply', 'bind', 'andThen'], 'map');
alias(Nothing, ['inspect'], 'toString');

Object.freeze(Nothing);

export default Nothing;
