export default function alias(obj, aliasNames, methodName) {
  function aliasedMethod(...args) {
    return this[methodName](...args);
  }

  aliasNames.forEach(aliasName => {
    Object.defineProperty(obj, aliasName, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: aliasedMethod
    });
  });
}
