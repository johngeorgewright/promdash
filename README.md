Promdash
========

[![Coverage Status](https://img.shields.io/coveralls/johngeorgewright/promdash/master.svg?style=flat-square)](https://coveralls.io/github/johngeorgewright/promdash?branch=master)
[![Build Status](https://img.shields.io/travis/johngeorgewright/promdash/master.svg?style=flat-square)](https://travis-ci.org/johngeorgewright/promdash)
[![NPM Version](https://img.shields.io/npm/v/promdash.svg?style=flat-square)](https://www.npmjs.com/package/promdash)
[![Dependencies](https://img.shields.io/gemnasium/johngeorgewright/promdash.svg?style=flat-square)](https://gemnasium.com/github.com/johngeorgewright/promdash)
[![License](https://img.shields.io/npm/l/promdash.svg?style=flat-square)](https://github.com/johngeorgewright/promdash/blob/master/LICENSE)

Lodash implementation in ES6 Promises.

[![NPM](https://nodei.co/npm/promdash.png)](https://nodei.co/npm/promdash/)

[![NPM](https://nodei.co/npm-dl/promdash.png)](https://nodei.co/npm-dl/promdash/)

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

### .then(Promise[])

Every Promdash method, including `then()`, resolves arrays of promises.

```js
import Promdash from 'promdash';

Promdash
  .rest(promises)
  // resolves all promses... then
  .map(item => doSomethingAsyncronous(item))
  // again, resolves all promises
  .then(console.log);

// This is equivalent to doing:
Promise
  .all(promises)
  .then(items => Promise.all(_.rest(items))
  .then(items => Promise.all(_.map(items, item => doSomethingAsyncronous(item))))
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

The lodash version is completely up to you. If you install lodash **before** installing promdash, promdash will pick up whatever version of lodash you're using. If you just install promdash, it will use the latest, stable version of lodash.

Installation
------------

```
npm i promdash
```
