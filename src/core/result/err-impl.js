import inspect from 'util-inspect';
import { alias, invariant } from '../../utils';
import { ERR_ACCESS_VALUE, ERR_UNWRAP_ERR } from '../errorTypes';

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
      typeof fn !== 'undefined',
      'Can only unwrap Ok',
      ERR_UNWRAP_ERR,
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

alias(Err.prototype, ['ap', 'apply', 'then', 'bind', 'flatMap'], 'map');
alias(Err.prototype, ['inspect'], 'toString');
