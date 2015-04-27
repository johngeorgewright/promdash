import _ from 'lodash';

export default class ProDash extends Promise {
  then(doSomething) {
    return super.then((...args) => {
      let result = doSomething(...args);
      return Array.isArray(result) ? ProDash.all(result) : result;
    });
  }
}

_.functions(_).forEach(f => {
  if (!ProDash.prototype[f]) {
    ProDash.prototype[f] = function (...yargs) {
      return this.then((...xargs) => _[f](...xargs, ...yargs));
    };
  }
});
