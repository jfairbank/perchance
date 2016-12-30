import isFunction from 'lodash/isFunction';
import inspect from 'util-inspect';
import { alias, invariant } from '../../utils';

import {
  ERR_ACCESS_VALUE,
  ERR_NEED_FUNCTION,
  ERR_UNWRAP_ERR,
} from '../errorTypes';

export default class Err {
  constructor(error) {
    Object.defineProperty(this, 'error', {
      value: error,
      enumerable: true,
      configurable: false,
      writable: false,
    });
  }

  get value() {
    invariant(
      false,
      'Accessing `value` on `Err`',
      ERR_ACCESS_VALUE,
    );
  }

  map() {
    return this;
  }

  unwrap(_, fn) {
    invariant(
      fn !== undefined,
      'Can only unwrap Ok',
      ERR_UNWRAP_ERR,
    );

    invariant(
      isFunction(fn),
      'Need function to unwrap Err',
      ERR_NEED_FUNCTION,
    );

    return fn(this.error);
  }

  withDefault(value) {
    return value;
  }

  isOk() {
    return false;
  }

  isErr() {
    return true;
  }

  toString() {
    return `Err ${inspect(this.error)}`;
  }
}

alias(Err.prototype, ['fmap', 'ap', 'apply', 'bind', 'andThen'], 'map');
alias(Err.prototype, ['inspect'], 'toString');
