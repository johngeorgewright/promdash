import _ from 'lodash';

export default class Promdash extends Promise {
  then(resolve, reject) {
    let arrayResolution = (...args) => {
      if (resolve) {
        let result = resolve(...args);
        return Array.isArray(result) ? this.constructor.all(result) : result;
      }
    };
    return super.then(arrayResolution, reject);
  }
}

Promdash.from = function (promise) {
  if (!promise.then) {
    throw new Error('Promdash.from() requires a `then`able object');
  }
  let P = this || Promdash;
  return new P(promise.then.bind(promise));
};

_.functions(_).forEach(f => {
  if (!Promdash.prototype[f]) {
    Promdash.prototype[f] = function (...yargs) {
      return this.then((...xargs) => _[f](...xargs, ...yargs));
    };
  }

  if (!Promdash[f]) {
    Promdash[f] = function (...args) {
      let result = _[f](...args);
      let P = this || Promdash;
      return Array.isArray(result) ? P.all(result) : P.resolve(result);
    };
  }
});
