import _ from 'lodash';

export default class ProDash extends Promise {
  then(resolve, reject) {
    let arrayResolution = (...args) => {
      let result = resolve(...args);
      return Array.isArray(result) ? ProDash.all(result) : result;
    };
    return super.then(arrayResolution, reject);
  }
}

ProDash.from = promise => {
  if (!(promise instanceof Promise)) {
    throw new Error('Promise.from() requires an instance of Promise');
  }
  return new ProDash(promise.then.bind(promise));
};

_.functions(_).forEach(f => {
  if (!ProDash.prototype[f]) {
    ProDash.prototype[f] = function (...yargs) {
      return this.then((...xargs) => _[f](...xargs, ...yargs));
    };
  }

  if (!ProDash[f]) {
    ProDash[f] = (...args) => {
      let result = _[f](...args);
      return Array.isArray(result) ? ProDash.all(result) : ProDash.resolve(result);
    };
  }
});
