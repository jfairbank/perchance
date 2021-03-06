# perchance

A simple maybe monad for JavaScript. Handle `null`s and `undefined`s more
gracefully with a maybe monad similar to functional languages like Haskell.

## Install

    $ npm install perchance

## Usage

Perchance comes with three functions, `maybe`, `Just`, and `Nothing`. You can
use these functions to create more functional code that avoids lots of if-else
checks for `null` or `undefined`. The real beauty of the maybe monad comes from
being able to wrap a value, apply transformations to it, and then unwrap the
final value whether it's a real value or `null` or `undefined`.

### `Just`

`Just` is a function that returns an internal `_Just` object that wraps regular
values ike numbers, strings, objects, etc. The only two values that you can't
wrap are `null` and `undefined`. When you try to wrap them, you get back a
`_Nothing` singleton instead. We'll see more of `_Nothing` later below.


```js
import { Just } from 'perchance';

Just(42)
  .map(n => n * 2)
  .unwrap(); // returns 84

Just('hello')
  .map(greeting => greeting + ' world')
  .unwrap(phrase => phrase + '!'); // map in unwrap to return 'hello world!'
```

### `Nothing`

`Nothing` is a function that returns an internal singleton object `_Nothing`.
`_Nothing` acts as a placeholder for `null` and `undefined` but has the same API
as `_Just` objects. This allows you to use OO-type functional code to deal with
`null`s and `undefined`s in your code without if-else checks.

The real power comes in the `unwrap` method. The `unwrap` method actually takes
two functions. The first function will only be invoked if the receiver is an
instance of `_Just`. If the receiver is `_Nothing`, then the second function
will be invoked. With the syntactical sugar of ES2015 arrow functions, this
allows you to write code close to pattern matching in functional languages.

Without the second function, `unwrap` will throw an error on `Nothing`.

```js
import { Nothing } from 'perchance';

Nothing()
  .map(n => n * 2)
  .unwrap(
    n => n,               // won't be invoked
    _ => 'Got nothing'    // will be invoked
  ); // return 'Got nothing'

Nothing().unwrap(); // throws an error
```

### `maybe`

`maybe` is a convenience function for wrapping values without using `Just` or
`Nothing` explicitly. As you might guess, if you wrap `null` or `undefined` with
`maybe`, then you'll get back `_Nothing`. Otherwise, you'll get back that value
wrapped with `_Just`.

```js
import { maybe } from 'perchance';

const half = (n) => {
  if (n % 2 === 0) {
    return n / 2;
  }

  return null;
}

maybe(half(4))
  .unwrap(
    v => v,
    _ => 'Could not halve integer'
  ); // returns 2

maybe(half(5))
  .unwrap(
    v => v,
    _ => 'Could not halve integer'
  ); // returns 'Could not halve integer'
```

## API

### `maybe`

```js
maybe(null | undefined): _Nothing
maybe(value: T): _Just<T>
```

### `Just`

```js
Just(null | undefined): _Nothing
Just(value: T): _Just<T>
```

### `_Just#map`

Transforms the wrapped value, returning a new instance of `_Just`. If the
mapping function returns `null` or `undefined`, then it returns `_Nothing`.

alias: `fmap`

```js
_Just<T>
  #map(fn: (value: T) => U): _Just<U>

_Just<T>
  #map(fn: (value: T) => null | undefined): _Nothing
```

### `_Just#ap`

Applies a wrapped function to the wrapped value of another `_Just` instance or a
no-op if passed `_Nothing`.

alias: `apply`

```js
_Just<fn: (value: T) => U>
  #ap(mappable: _Nothing): _Nothing

_Just<fn: (value: T) => U>
  #ap(mappable: _Just<T>): _Just<U>
```

### `_Just#bind`

Takes a function that returns a `_Just` or `_Nothing`, applies that function to
the wrapped value, and returns a new `_Just` with that wrapped value (or
`_Nothing` if the function argument returned `_Nothing`).

```js
_Just<T>
  #bind(fn: (value: T) => _Just<U>): _Just<U>

_Just<T>
  #bind(fn: (value: T) => _Nothing): _Nothing
```

### `_Just#unwrap`

Unwraps the inner value if no arguments are passed. Invokes and returns the
return value of the first function argument otherwise, passing in the wrapped
value to the function.

```js
_Just<T>
  #unwrap(): T

_Just<T>
  #unwrap(fn: (value: T) => U): U
```

### `Nothing`

```js
Nothing(): _Nothing
```

### `_Nothing` methods

aliases:

| method | alias name |
| ------ | ---------- |
| `map`  | `fmap`     |
| `ap`   | `apply`    |

```js
_Nothing<T>
  #map(fn: (value: T) => U): _Nothing

_Nothing<fn: (value: T) => U>
  #ap(mappable: any): _Nothing

_Nothing<T>
  #bind(fn: (value: T) => _Just<U>): _Nothing

_Nothing<T>
  #bind(fn: (value: T) => _Nothing): _Nothing
```

### `_Nothing#unwrap`

Invokes and returns the return value of the second function argument. Throws an
error if the second function argument is missing.

```js
_Nothing<T>
  #unwrap(): throws

_Nothing<T>
  #unwrap(fn: () => T): T
```

## Contributing

1. Fork repo
2. Install a current version of node
3. Install dependencies with `npm install`
4. Add feature or bug fix
5. Add tests in test directory if necessary
6. Run tests with `npm test`
7. Submit PR.
