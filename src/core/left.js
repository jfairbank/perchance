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

  map(fn) {
    return stayLeft();
  }

  ap(m) {
    invariant(
      isObject(m),
      'Can only apply to objects',
      ERR_NEED_OBJECT
    );

    invariant(
      'map' in m,
      'Can only apply to objects with a `map` method',
      ERR_NEED_MAP
    );

    return m.map(this.value);
  }

  bind(fn) {
    return stayLeft();
  }

  unwrap(fn) {
    if (fn === undefined) {
      return this.value;
    }

    invariant(
      isFunction(fn),
      'Need function to unwrap Left',
      ERR_NEED_FUNCTION
    );

    return fn(this.value);
  }

  toString() {
    return `Left(${this.value})`;
  }
}

alias(_Left.prototype, ['fmap'], 'map');
alias(_Left.prototype, ['apply'], 'ap');
alias(_Left.prototype, ['inspect'], 'toString');

export default function Left(value) {
  return new _Left(value);
}

export function isLeft(value) {
  return value instanceof _Left;
}
