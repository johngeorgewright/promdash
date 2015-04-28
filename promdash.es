import _ from 'lodash';

export default class Promdash extends Promise {
  then(resolve, reject) {
    let arrayResolution = (...args) => {
      let result = resolve(...args);
      return Array.isArray(result) ? Promdash.all(result) : result;
    };
    return super.then(arrayResolution, reject);
  }
}

Promdash.from = promise => {
  if (!(promise instanceof Promise)) {
    throw new Error('Promise.from() requires an instance of Promise');
  }
  return new Promdash(promise.then.bind(promise));
};

_.functions(_).forEach(f => {
  if (!Promdash.prototype[f]) {
    Promdash.prototype[f] = function (...yargs) {
      return this.then((...xargs) => _[f](...xargs, ...yargs));
    };
  }

  if (!Promdash[f]) {
    Promdash[f] = (...args) => {
      let result = _[f](...args);
      return Array.isArray(result) ? Promdash.all(result) : Promdash.resolve(result);
    };
  }
});
