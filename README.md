Promdash
=======

Lodash implementation in ES6 Promises.

[![NPM](https://nodei.co/npm/promdash.png)](https://nodei.co/npm/promdash/)

[![NPM](https://nodei.co/npm/promdash.png)](https://nodei.co/npm-dl/promdash/)

API
---

### Lodash on the instance

All functions listed in the [lodash API](https://lodash.com/docs) are added to the Promise class.

```js
import Promdash from 'promdash';

let promise = new Promdash(resolve => resolve([0, 1, 2, 3, 4]));

promise
  .filter()
  .map(x => x + 1)
  .rest()
  .then(console.log); // [3, 4, 5]
```

### Lodash on the class

Lodash is also available statically:

```js
import Promdash from 'promdash';

Promdash
  .filter([0, promise1, 2, promise3, 4])
  .map(x => x + 1)
  .rest()
  .then(console.log); // [3, 4, 5]
```

### .then()

What's more is that the `then()` has been patched to resolve any array just like `Promise.all()`:

```js
import Promdash from 'promdash';

Promdash
  .rest(promises)
  // resolves all promses... then
  .map(item => doSomethingAsyncronous(item))
  // again, resolves all promises
  .then(console.log);
```

### .from()

If you need to need to convert an instance of `Promise` in to an instance of `Promdash`, use the `.from()` function:

```js
import Promdash from 'promdash';
import reqwest from 'reqwest';

let promise = reqwest.get('/some-data.json');
Promdash.from(promise).map(item => item + 2);
```

How?
====

Simply an extended Promise class that has a `then` method for every lodash function.

Installation
------------

```
npm i promdash
```
