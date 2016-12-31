import inspect from 'util-inspect';
import { alias, invariant } from '../../utils';
import { ERR_ACCESS_ERROR } from '../errorTypes';

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
    return m.map(fn => fn(this.value));
  }

  then(fn) {
    return fn(this.value);
  }

  unwrap(fn) {
    if (typeof fn === 'undefined') {
      return this.value;
    }

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

alias(Ok.prototype, ['apply'], 'ap');
alias(Ok.prototype, ['bind', 'flatMap'], 'then');
alias(Ok.prototype, ['inspect'], 'toString');
