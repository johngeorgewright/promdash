/*eslint-env node, mocha*/

import chai from 'chai';
import ProDash from '../pro-dash';
let {expect} = chai;

function resolve(...values) {
  return new ProDash(resolve => resolve(...values));
}

// Essentially copy the examples from lodash and make sure they work
describe('Lodash integration', () => {
  describe('array#chunk(size=1)', () => {
    it('s default size is 1', () => {
      return resolve([0, 1, 2, 3, 4])
        .chunk()
        .then(result => expect(result).to.eql([[0], [1], [2], [3], [4]]));
    });

    it('will chunk an array up in a given size', () => {
      return resolve(['a', 'b', 'c', 'd'])
        .chunk(3)
        .then(result => expect(result).to.eql([['a', 'b', 'c'], ['d']]));
    });
  });

  describe('array#compact()', () => {
    it('will remove all falsy value', () => {
      return resolve([0, 1, false, 2, '', 3])
        .compact()
        .then(result => expect(result).to.eql([1, 2, 3]));
    });
  });

  describe('array#difference(array, [values])', () => {
    it('creates an array excluding all values of the provided arrays using SameValueZero for equality comparisons', () => {
      return resolve([1, 2, 3])
        .difference([4, 2])
        .then(result => expect(result).to.eql([1, 3]));
    });
  });

  describe('array#drop(array, [n=1])', () => {
    it('s default `n` is 1', () => {
      return resolve([1, 2, 3])
        .drop()
        .then(result => expect(result).to.eql([2, 3]));
    });

    it('can take a number as `n`', () => {
      return resolve([1, 2, 3])
        .drop(2)
        .then(result => expect(result).to.eql([3]));
    });

    it('will return an empty array when there is nothing left to drop', () => {
      return resolve([1, 2, 3])
        .drop(5)
        .then(result => expect(result).to.be.empty);
    });

    it('wont do anything with a zero', () => {
      return resolve([1, 2, 3])
        .drop(0)
        .then(result => expect(result).to.eql([1, 2, 3]));
    });
  });

  describe('array#dropRight(array, [n=1])', () => {
    it('s default `n` is 1', () => {
      return resolve([1, 2, 3])
        .dropRight()
        .then(result => expect(result).to.eql([1, 2]));
    });

    it('can take a number as `n`', () => {
      return resolve([1, 2, 3])
        .dropRight(2)
        .then(result => expect(result).to.eql([1]));
    });

    it('will return an empty array when there is nothing left to drop', () => {
      return resolve([1, 2, 3])
        .dropRight(5)
        .then(result => expect(result).to.be.empty);
    });

    it('wont do anything with a zero', () => {
      return resolve([1, 2, 3])
        .dropRight(0)
        .then(result => expect(result).to.eql([1, 2, 3]));
    });
  });

  describe('array#dropRightWhile(array, [predicate=_.identity], [thisArg])', () => {
    let users;

    beforeEach(() => users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
      { user: 'pebbles', active: false }
    ]);

    it('can take a function as a predicate', () => {
      return resolve([1, 2, 3])
        .dropRightWhile(n => n > 1)
        .then(result => expect(result).to.eql([1]));
    });

    it('works using the `_.matches` callback shorthand', () => {
      return resolve(users)
        .dropRightWhile({ user: 'pebbles', active: false })
        .then(result => expect(result).to.eql([
          { user: 'barney', active: true },
          { user: 'fred', active: false }
        ]));
    });

    it('works using the `_.matchesProperty` callback shorthand', () => {
      return resolve(users)
        .dropRightWhile('active', false)
        .then(result => expect(result).to.eql([
          { user: 'barney', active: true }
        ]));
    });

    it('works using the `_.property` callback shorthand', () => {
      return resolve(users)
        .dropRightWhile('active')
        .then(result => expect(result).to.eql(users));
    });
  });

  describe('array#dropWhile(array, [predicate=_.identity], [thisArg])', () => {
    let users;

    beforeEach(() => users = [
      { user: 'barney', active: false },
      { user: 'fred', active: false },
      { user: 'pebbles', active: true }
    ]);

    it('can take a function as a predicate', () => {
      return resolve([1, 2, 3])
        .dropWhile(n => n < 3)
        .then(result => expect(result).to.eql([3]));
    });

    it('works using the `_.matches` callback shorthand', () => {
      return resolve(users)
        .dropWhile({ user: 'barney', active: false })
        .then(result => expect(result).to.eql([
          { user: 'fred', active: false },
          { user: 'pebbles', active: true }
        ]));
    });

    it('works using the `_.matchesProperty` callback shorthand', () => {
      return resolve(users)
        .dropWhile('active', false)
        .then(result => expect(result).to.eql([
          { user: 'pebbles', active: true }
        ]));
    });

    it('works using the `_.property` callback shorthand', () => {
      return resolve(users)
        .dropWhile('active')
        .then(result => expect(result).to.eql(users));
    });
  });

  describe('collection#every(predicate=truthy)', () => {
    it('s default predicate is to check for truthy values', () => {
      return resolve([0, 1, 2, 3, 4])
        .every()
        .then(result => expect(result).to.be.false);
    });

    it('can take a function as a predicate', () => {
      return resolve({foo: 'bar', long: 'long'})
        .every(x => x.length > 2)
        .then(result => expect(result).to.be.true);
    });
  });

  describe('collection#filter(predicate=truthy)', () => {
    it('s default predicate is to check for truthy values', () => {
      return resolve([0, 1, 2, 3, 4])
        .filter()
        .then(result => expect(result).to.eql([1, 2, 3, 4]));
    });

    it('can take a function as a predicate', () => {
      return resolve([0, 1, 2, 3, 4])
        .filter(x => x > 2)
        .then(result => expect(result).to.eql([3, 4]));
    });
  });
});
