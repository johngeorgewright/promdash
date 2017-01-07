/* eslint-env mocha */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import Promdash from '../promdash.src.js'

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.should()

function resolve (...values) {
  return new Promdash(resolve => resolve(...values))
}

describe('Promdash', () => {
  describe('#then()', () => {
    beforeEach(() => sinon.spy(Promdash, 'all'))
    afterEach(() => Promdash.all.restore())

    it('uses Promdash.all on arrays', () => {
      return resolve([1, 2, 3])
        .then(Promdash.identity)
        .then(() => Promdash.all.should.have.been.calledWithExactly([1, 2, 3]))
    })
  })

  describe('.from()', () => {
    it.only('converts a Promise in to a Promdash instance', () => {
      Promdash.from(Promise.resolve()).should.be.an.instanceOf(Promdash)
    })

    it('will instantly reject an already rejected promise', () => {
      let promise = new Promise((resolve, reject) => reject())
      return Promdash.from(promise).should.be.rejected
    })

    it('will resolve an already resolved promise', () => {
      return Promdash.from(resolve()).should.be.fulfilled
    })

    it('will throw an error when something other than a thenable object is given', () => {
      (() => Promise.from({})).should.throw(Error)
    })
  })

  describe('.resolve()', () => {
    it('returns an instance of Promdash', () => {
      Promdash.resolve('something').should.be.an.instanceOf(Promdash)
    })
  })

  describe('.reject()', () => {
    it('returns an instance of Promdash', () => {
      Promdash.reject(new Error()).should.be.an.instanceOf(Promdash)
    })
  })

  describe('.all()', () => {
    it('returns an instance of Promdash', () => {
      Promdash.all([]).should.be.an.instanceOf(Promdash)
    })
  })
})
