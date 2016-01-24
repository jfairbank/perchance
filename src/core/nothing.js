import isFunction from 'lodash/isFunction';
import deepFreeze from 'deep-freeze';
import invariant from '../util/invariant';
import alias from '../util/alias';
import { ERR_UNWRAP_NOTHING, ERR_NEED_FUNCTION } from './errorTypes';

const _Nothing = {
  map() {
    return _Nothing;
  },

  unwrap(_, fn) {
    invariant(
      fn !== undefined,
      'Can only unwrap Just',
      ERR_UNWRAP_NOTHING
    );

    invariant(
      isFunction(fn),
      'Need function to unwrap Nothing',
      ERR_NEED_FUNCTION
    );

    return fn();
  },

  toString() {
    return 'Nothing';
  }
};

alias(_Nothing, ['fmap', 'ap', 'apply', 'bind'], 'map');
alias(_Nothing, ['inspect'], 'toString');

deepFreeze(_Nothing);

export default function Nothing() {
  return _Nothing;
}
