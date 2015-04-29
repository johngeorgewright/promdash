/*eslint-env node, mocha*/

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai'
import sinon from 'sinon';
import Promdash from '../promdash';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

function resolve(...values) {
  return new Promdash(resolve => resolve(...values));
}

describe('Promdash', () => {
  describe('#then()', () => {
    beforeEach(() => sinon.spy(Promdash, 'all'));
    afterEach(() => Promdash.all.restore());

    it('uses Promdash.all on arrays', () => {
      return resolve([1, 2, 3])
        .then(Promdash.identity)
        .then(() => Promdash.all.should.have.been.calledWithExactly([1, 2, 3]));
    });
  });

  describe('.from()', () => {
    it('converts a Promise in to a Promdash instance', () => {
      Promdash.from(resolve()).should.be.an.instanceof(Promdash);
    });

    it('will instantly reject an already rejected promise', () => {
      let promise = new Promise((res, rej) => rej());
      return Promdash.from(promise).should.be.rejected;
    });

    it('will resolve if an already resolved promise', () => {
      return Promdash.from(resolve()).should.be.fulfilled;
    });
  });
});
