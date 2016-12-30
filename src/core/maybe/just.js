import JustImpl from './just-impl';
import NothingImpl from './nothing-impl';
import { ifValue } from '../../utils';

export default function Just(value) {
  return ifValue(
    value,
    () => new JustImpl(value),
    () => NothingImpl,
  );
}
