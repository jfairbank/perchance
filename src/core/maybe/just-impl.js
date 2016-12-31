import inspect from 'util-inspect';
import NothingImpl from './nothing-impl';
import { alias, ifValue } from '../../utils';

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

alias(Just.prototype, ['apply'], 'ap');
alias(Just.prototype, ['bind', 'flatMap'], 'then');
alias(Just.prototype, ['inspect'], 'toString');
