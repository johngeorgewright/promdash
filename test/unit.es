/*eslint-env node, mocha*/

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai'
import sinon from 'sinon';
import ProDash from '../pro-dash';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

function resolve(...values) {
  return new ProDash(resolve => resolve(...values));
}

describe('ProDash', () => {
  describe('#then()', () => {
    beforeEach(() => sinon.spy(ProDash, 'all'));
    afterEach(() => ProDash.all.restore());

    it('uses ProDash.all on arrays', () => {
      return resolve([1, 2, 3])
        .then(array => array)
        .then(() => ProDash.all.should.have.been.calledWithExactly([1, 2, 3]));
    });
  });

  describe('.from()', () => {
    it('converts a Promise in to a ProDash instance', () => {
      let promise = new Promise(r => r());
      ProDash.from(promise).should.be.an.instanceof(ProDash);
    });

    it('will instantly reject an already rejected promise', () => {
      let promise = new Promise((res, rej) => rej());
      return ProDash.from(promise).should.be.rejected;
    });

    it('will resolve if an already resolved promise', () => {
      let promise = new Promise(res => res());
      return ProDash.from(promise).should.be.fulfilled;
    });
  });
});
