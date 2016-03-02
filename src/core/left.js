import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import invariant from '../util/invariant';
import ifValue from '../util/ifValue';
import alias from '../util/alias';
import { ERR_NEED_OBJECT, ERR_NEED_MAP, ERR_NEED_FUNCTION } from './errorTypes';

class _Left {
  constructor(value) {
    Object.defineProperty(this, 'value', {
      value,
      enumerable: true,
      configurable: false,
      writable: false
    });
  }

  stayLeft() {
    return Left(this.value);
  }

  unwrap(_, fn) {
    invariant(
      fn !== undefined,
      'Can only unwrap Right',
      ERR_UNWRAP_NOTHING
    );

    invariant(
      isFunction(fn),
      'Need function to unwrap Left',
      ERR_NEED_FUNCTION
    );

    return fn();
  }

  toString() {
    return `Left(${this.value})`;
  }
}

alias(_Left.prototype, ['fmap','map', 'apply', 'ap'], 'stayLeft');
alias(_Left.prototype, ['apply'], 'ap');
alias(_Left.prototype, ['inspect'], 'toString');

export default function Left(value) {
  return new _Left(value);
}

export function isLeft(value) {
  return value instanceof _Left;
}
