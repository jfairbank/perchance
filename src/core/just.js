import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import invariant from '../util/invariant';
import Nothing from './nothing';
import ifValue from '../util/ifValue';
import alias from '../util/alias';
import { ERR_NEED_OBJECT, ERR_NEED_MAP, ERR_NEED_FUNCTION } from './errorTypes';

class _Just {
  constructor(value) {
    Object.defineProperty(this, 'value', {
      value,
      enumerable: true,
      configurable: false,
      writable: false
    });
  }

  map(fn) {
    return ifValue(
      fn(this.value),
      newValue => Just(newValue),
      () => Nothing()
    );
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
    return fn(this.value);
  }

  unwrap(fn) {
    if (fn === undefined) {
      return this.value;
    }

    invariant(
      isFunction(fn),
      'Need function to unwrap Just',
      ERR_NEED_FUNCTION
    );

    return fn(this.value);
  }

  toString() {
    return `Just(${this.value})`;
  }
}

alias(_Just.prototype, ['fmap'], 'map');
alias(_Just.prototype, ['apply'], 'ap');
alias(_Just.prototype, ['inspect'], 'toString');

export default function Just(value) {
  return ifValue(
    value,
    () => new _Just(value),
    () => Nothing()
  );
}

export function isJust(value) {
  return value instanceof _Just;
}
