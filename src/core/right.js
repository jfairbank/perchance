import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import invariant from '../util/invariant';
import { isLeft, Left } from './left';
import ifValue from '../util/ifValue';
import alias from '../util/alias';
import { ERR_NEED_OBJECT, ERR_NEED_MAP, ERR_NEED_FUNCTION } from './errorTypes';

class _Right {
  constructor(value) {
    Object.defineProperty(this, 'value', {
      value,
      enumerable: true,
      configurable: false,
      writable: false
    });
  }

  map(fn) {
    if (isLeft(this.value)) return Left(this.value);
    return Right(fn(this.value));
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
    if (isLeft(m)) return Left(this.value);
    return m.map(this.value);
  }

  bind(fn) {
    if (isLeft(this.value)) return Left(this.value);
    return fn(this.value);
  }

  unwrap(fn,_) {
    return isFunction(fn) ? fn(this.value) : this.value;
  }

  toString() {
    return `Right(${this.value})`;
  }
}

alias(_Right.prototype, ['fmap'], 'map');
alias(_Right.prototype, ['apply'], 'ap');
alias(_Right.prototype, ['inspect'], 'toString');

export function Right(value) {
  return new _Right(value);
}

export function isRight(value) {
  return value instanceof _Right;
}
