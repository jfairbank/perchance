import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import inspect from 'util-inspect';
import NothingImpl from './nothing-impl';
import { alias, ifValue, invariant } from '../../utils';
import { ERR_NEED_OBJECT, ERR_NEED_MAP, ERR_NEED_FUNCTION } from '../errorTypes';

export default class Just {
  constructor(value) {
    Object.defineProperty(this, 'value', {
      value,
      enumerable: true,
      configurable: false,
      writable: false,
    });
  }

  map(fn) {
    return ifValue(
      fn(this.value),
      newValue => new Just(newValue),
      () => NothingImpl,
    );
  }

  ap(m) {
    invariant(
      isObject(m),
      'Can only apply to objects',
      ERR_NEED_OBJECT,
    );

    invariant(
      'map' in m,
      'Can only apply to objects with a `map` method',
      ERR_NEED_MAP,
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
      ERR_NEED_FUNCTION,
    );

    return fn(this.value);
  }

  withDefault() {
    return this.value;
  }

  isJust() {
    return true;
  }

  isNothing() {
    return false;
  }

  toString() {
    return `Just ${inspect(this.value)}`;
  }
}

alias(Just.prototype, ['fmap'], 'map');
alias(Just.prototype, ['apply'], 'ap');
alias(Just.prototype, ['andThen'], 'bind');
alias(Just.prototype, ['inspect'], 'toString');
