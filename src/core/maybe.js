import Just from './just';
import Nothing from './nothing';
import ifValue from '../util/ifValue';

export default function maybe(value) {
  return ifValue(
    value,
    () => Just(value),
    () => Nothing()
  );
}
