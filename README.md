ProDash
=======

Lodash implementation in ES6 Promises.

All functions listed in the [lodash API](https://lodash.com/docs) are added to the Promise class.

```js
import ProDash from 'pro-dash';

let promise = new ProDash(resolve => resolve([0, 1, 2, 3, 4]));

promise
  .filter()
  .map(x => x + 1)
  .rest()
  .then(console.log); // [3, 4, 5]
```

They're also available statically:

```js
import ProDash from 'pro-dash';

ProDash
  .filter([promise1, promise2, 3, promise4, 5])
  .map(x => x + 1)
  .rest()
  .then(console.log); // [3, 4, 5]
```

What's more is that the `then()` has been patched to resolve any array just like `Promise.all()`:

```js
import ProDash from 'pro-dash';

ProDash
  .rest(promises)
  // resolves all promses... then
  .map(item => doSomethingAsyncronous(item))
  // again, resolves all promises
  .then(console.log);
```

How?
====

Simply an extended Promise class that has a `then` method for every lodash function.

Installation
------------

```
npm i pro-dash
```
