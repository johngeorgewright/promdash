import chai from 'chai';
import sinon from 'sinon';
import ProDash from '../source/pro-dash';
let {expect} = chai;

function resolveAs(value) {
  return new ProDash(resolve => resolve(value));
}

describe('Promise', () => {
  describe('array#chunk(size=1)', () => {
    it('s default size is 1', () => {
      return resolveAs([0, 1, 2, 3, 4])
        .chunk()
        .then(result => expect(result).to.eql([[0], [1], [2], [3], [4]]));
    });

    it('will chunk an array up in a given size', () => {
      return resolveAs([0, 1, 2, 3, 4])
        .chunk(3)
        .then(result => expect(result).to.eql([[0, 1, 2], [3, 4]]));
    });
  });

  describe('array#compact()', () => {
    it('will remove all falsy value', () => {
      return resolveAs([0, 2, undefined, false, 8])
        .compact()
        .then(result => expect(result).to.eql([2, 8]));
    });
  });

  describe('collection#every(predicate=truthy)', () => {
    it('s default predicate is to check for truthy values', () => {
      return resolveAs([0, 1, 2, 3, 4])
        .every()
        .then(result => expect(result).to.be.false);
    });

    it('can take a function as a predicate', () => {
      return resolveAs({foo: 'bar', long: 'long'})
        .every(x => x.length > 2)
        .then(result => expect(result).to.be.true);
    });
  });

  describe('collection#filter(predicate=truthy)', () => {
    it('s default predicate is to check for truthy values', () => {
      return resolveAs([0, 1, 2, 3, 4])
        .filter()
        .then(result => expect(result).to.eql([1, 2, 3, 4]));
    });

    it('can take a function as a predicate', () => {
      return resolveAs([0, 1, 2, 3, 4])
        .filter(x => x > 2)
        .then(result => expect(result).to.eql([3, 4]));
    });
  });
});
