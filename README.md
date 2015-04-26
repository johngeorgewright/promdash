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

How?
====

Simply an extended Promise class that has a `then` method for every lodash function.

Installation
------------

```
npm i pro-dash
```
