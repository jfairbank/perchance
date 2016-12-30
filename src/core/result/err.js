import ErrImpl from './err-impl';

export default function Err(error) {
  return new ErrImpl(error);
}
