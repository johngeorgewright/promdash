import _ from 'lodash';

export default class ProDash extends Promise {}

_.functions(_).forEach(f => {
  if (ProDash.prototype[f]) return;
  ProDash.prototype[f] = function (...yargs) {
    return this.then((...xargs) => {
      return _[f](...xargs, ...yargs);
    });
  };
});
