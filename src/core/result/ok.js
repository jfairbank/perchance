import OkImpl from './ok-impl';

export default function Ok(value) {
  return new OkImpl(value);
}
