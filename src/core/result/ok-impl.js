import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import inspect from 'util-inspect';
import { alias, invariant } from '../../utils';

import {
  ERR_ACCESS_ERROR,
  ERR_NEED_FUNCTION,
  ERR_NEED_MAP,
  ERR_NEED_OBJECT,
} from '../errorTypes';

export default class Ok {
  constructor(value) {
    Object.defineProperty(this, 'value', {
      value,
      enumerable: true,
      configurable: false,
      writable: false,
    });
  }

  get error() {
    invariant(
      false,
      'Accessing `error` on `Ok`',
      ERR_ACCESS_ERROR,
    );
  }

  map(fn) {
    return new Ok(fn(this.value));
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
      'Need function to unwrap Ok',
      ERR_NEED_FUNCTION,
    );

    return fn(this.value);
  }

  withDefault() {
    return this.value;
  }

  isOk() {
    return true;
  }

  isErr() {
    return false;
  }

  toString() {
    return `Ok ${inspect(this.value)}`;
  }
}

alias(Ok.prototype, ['fmap'], 'map');
alias(Ok.prototype, ['apply'], 'ap');
alias(Ok.prototype, ['andThen'], 'bind');
alias(Ok.prototype, ['inspect'], 'toString');
