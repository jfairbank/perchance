export default function ifValue(value, valueFunction, ifNullFunction) {
  if (value == null) {
    return ifNullFunction();
  }

  return valueFunction(value);
}
