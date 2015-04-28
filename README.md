ProDash
=======

Lodash implementation in ES6 Promises.

API
---

### Lodash on the instance

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

### Lodash on the class

Lodash is also available statically:

```js
import ProDash from 'pro-dash';

ProDash
  .filter([0, promise1, 2, promise3, 4])
  .map(x => x + 1)
  .rest()
  .then(console.log); // [3, 4, 5]
```

### .then()

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

### .from()

If you need to need to convert an instance of `Promise` in to an instance of `ProDash`, use the `.from()` function:

```js
import ProDash from 'pro-dash';
import reqwest from 'reqwest';

let promise = reqwest.get('/some-data.json');
ProDash.from(promise).map(item => item + 2);
```

How?
====

Simply an extended Promise class that has a `then` method for every lodash function.

Installation
------------

```
npm i pro-dash
```
