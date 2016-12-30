import _invariant from 'invariant';

export function alias(obj, aliasNames, methodName) {
  function aliasedMethod(...args) {
    return this[methodName](...args);
  }

  aliasNames.forEach((aliasName) => {
    Object.defineProperty(obj, aliasName, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: aliasedMethod,
    });
  });
}

export function ifValue(value, valueFunction, ifNullFunction) {
  if (value == null) {
    return ifNullFunction();
  }

  return valueFunction(value);
}

export function invariant(assertion, message, errorType) {
  _invariant(assertion, `${errorType}: ${message}`);
}
