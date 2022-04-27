import _ from "lodash";

export default class Promdash<T> extends Promise<T> {
  override then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ) {
    const arrayResolution = (arg: T) => {
      if (onfulfilled) {
        const result = onfulfilled(arg);
        return Array.isArray(result) ? Promdash.all(result) : result;
      }
      return arg;
    };
    return super.then(arrayResolution, onrejected);
  }

  static from<T>(promise: PromiseLike<T>) {
    if (!promise.then) {
      throw new Error("Promdash.from() requires a `then`able object");
    }
    const P = this || Promdash;
    return new P(promise.then.bind(promise));
  }
}

_.functions(_).forEach((f) => {
  if (!Promdash.prototype[f]) {
    Promdash.prototype[f] = function (...yargs) {
      return this.then((...xargs) => _[f](...xargs, ...yargs));
    };
  }

  if (!Promdash[f]) {
    Promdash[f] = function (...args) {
      const result = _[f](...args);
      const P = this || Promdash;
      return Array.isArray(result) ? P.all(result) : P.resolve(result);
    };
  }
});
