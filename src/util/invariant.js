import _invariant from 'invariant';

export default function invariant(assertion, message, errorType) {
  _invariant(assertion, `${errorType}: ${message}`);
}
