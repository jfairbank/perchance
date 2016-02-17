import test from 'ava';
import alias from '../../src/util/alias';

test('aliases the given methods to an existing method on the object', t => {
  const object = {
    foo() { return 'foo'; }
  };

  alias(object, ['bar', 'baz'], 'foo');

  t.is(object.foo(), 'foo', 'original method still exists');
  t.is(object.bar(), 'foo', 'aliased bar works');
  t.is(object.baz(), 'foo', 'aliased baz works');
});
