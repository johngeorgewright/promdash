/*eslint-env node, mocha*/

import chai from 'chai';
import sinonChai from 'sinon-chai'
import sinon from 'sinon';
import ProDash from '../pro-dash';

chai.use(sinonChai);
let {expect} = chai;

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
        .then(() => expect(ProDash.all).to.have.been.calledWithExactly([1, 2, 3]));
    });
  });
});
