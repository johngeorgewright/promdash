/* eslint-env mocha */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Promdash from '../promdash.src.js'

chai.use(chaiAsPromised)
chai.should()

function resolve (...values) {
  return new Promdash(done => done(...values))
}

// Essentially copy the examples from lodash and make sure they work
describe('Lodash integration', () => {
  describe('#chunk(size=1)', () => {
    it('will chunk an array up in a given size', () => (
      resolve(['a', 'b', 'c', 'd'])
        .chunk(3)
        .should.eventually.eql([['a', 'b', 'c'], ['d']])
    ))
  })

  describe('.chunk(size=1)', () => {
    it('will chunk an array up in a given size', () => (
      Promdash.chunk(['a', 'b', 'c', 'd'], 3)
        .should.eventually.eql([['a', 'b', 'c'], ['d']])
    ))
  })

  describe('#compact()', () => {
    it('will remove all falsy value', () => (
      resolve([0, 1, false, 2, '', 3])
        .compact()
        .should.eventually.eql([1, 2, 3])
    ))
  })

  describe('.compact()', () => {
    it('will remove all falsy value', () => (
      Promdash.compact([0, 1, false, 2, '', 3])
        .should.eventually.eql([1, 2, 3])
    ))
  })

  describe('#difference(array, [values])', () => {
    it('creates an array excluding all values of the provided arrays using SameValueZero for equality comparisons', () => (
      resolve([1, 2, 3])
        .difference([4, 2])
        .should.eventually.eql([1, 3])
    ))
  })

  describe('.difference(array, [values])', () => {
    it('creates an array excluding all values of the provided arrays using SameValueZero for equality comparisons', () => (
      Promdash.difference([1, 2, 3], [4, 2])
        .should.eventually.eql([1, 3])
    ))
  })

  describe('#drop(array, [n=1])', () => {
    it('s default `n` is 1', () => (
      resolve([1, 2, 3])
        .drop()
        .should.eventually.eql([2, 3])
    ))

    it('can take a number as `n`', () => (
      resolve([1, 2, 3])
        .drop(2)
        .should.eventually.eql([3])
    ))

    it('will return an empty array when there is nothing left to drop', () => (
      resolve([1, 2, 3])
        .drop(5)
        .should.eventually.be.empty
    ))

    it('wont do anything with a zero', () => (
      resolve([1, 2, 3])
        .drop(0)
        .should.eventually.eql([1, 2, 3])
    ))
  })

  describe('.drop(array, [n=1])', () => {
    it('s default `n` is 1', () => (
      Promdash.drop([1, 2, 3])
        .should.eventually.eql([2, 3])
    ))

    it('can take a number as `n`', () => (
      Promdash.drop([1, 2, 3], 2)
        .should.eventually.eql([3])
    ))

    it('will return an empty array when there is nothing left to drop', () => (
      Promdash.drop([1, 2, 3], 5)
        .should.eventually.be.empty
    ))

    it('wont do anything with a zero', () => (
      Promdash.drop([1, 2, 3], 0)
        .should.eventually.eql([1, 2, 3])
    ))
  })

  describe('#dropRight(array, [n=1])', () => {
    it('s default `n` is 1', () => (
      resolve([1, 2, 3])
        .dropRight()
        .should.eventually.eql([1, 2])
    ))

    it('can take a number as `n`', () => (
      resolve([1, 2, 3])
        .dropRight(2)
        .should.eventually.eql([1])
    ))

    it('will return an empty array when there is nothing left to drop', () => (
      resolve([1, 2, 3])
        .dropRight(5)
        .should.eventually.be.empty
    ))

    it('wont do anything with a zero', () => (
      resolve([1, 2, 3])
        .dropRight(0)
        .should.eventually.eql([1, 2, 3])
    ))
  })

  describe('.dropRight(array, [n=1])', () => {
    it('s default `n` is 1', () => (
      Promdash.dropRight([1, 2, 3])
        .should.eventually.eql([1, 2])
    ))

    it('can take a number as `n`', () => (
      Promdash.dropRight([1, 2, 3], 2)
        .should.eventually.eql([1])
    ))

    it('will return an empty array when there is nothing left to drop', () => (
      Promdash.dropRight([1, 2, 3], 5)
        .should.eventually.be.empty
    ))

    it('wont do anything with a zero', () => (
      Promdash.dropRight([1, 2, 3], 0)
        .should.eventually.eql([1, 2, 3])
    ))
  })

  describe('#dropRightWhile(array, [predicate=_.identity], [thisArg])', () => {
    let users

    beforeEach(() => {
      users = [
        { user: 'barney', active: true },
        { user: 'fred', active: false },
        { user: 'pebbles', active: false }
      ]
    })

    it('can take a function as a predicate', () => (
      resolve([1, 2, 3])
        .dropRightWhile(n => n > 1)
        .should.eventually.eql([1])
    ))

    it('works using the `_.matches` callback shorthand', () => (
      resolve(users)
        .dropRightWhile({ user: 'pebbles', active: false })
        .should.eventually.eql([
          { user: 'barney', active: true },
          { user: 'fred', active: false }
        ])
    ))

    it('works using the `_.matchesProperty` callback shorthand', () => (
      resolve(users)
        .dropRightWhile(['active', false])
        .should.eventually.eql([
          { user: 'barney', active: true }
        ])
    ))

    it('works using the `_.property` callback shorthand', () => (
      resolve(users)
        .dropRightWhile('active')
        .should.eventually.eql(users)
    ))
  })

  describe('.dropRightWhile(array, [predicate=_.identity], [thisArg])', () => {
    let users

    beforeEach(() => {
      users = [
        { user: 'barney', active: true },
        { user: 'fred', active: false },
        { user: 'pebbles', active: false }
      ]
    })

    it('can take a function as a predicate', () => (
      Promdash.dropRightWhile([1, 2, 3], n => n > 1)
        .should.eventually.eql([1])
    ))

    it('works using the `_.matches` callback shorthand', () => (
      Promdash.dropRightWhile(users, { user: 'pebbles', active: false })
        .should.eventually.eql([
          { user: 'barney', active: true },
          { user: 'fred', active: false }
        ])
    ))

    it('works using the `_.matchesProperty` callback shorthand', () => (
      Promdash.dropRightWhile(users, ['active', false])
        .should.eventually.eql([
          { user: 'barney', active: true }
        ])
    ))

    it('works using the `_.property` callback shorthand', () => (
      Promdash.dropRightWhile(users, 'active')
        .should.eventually.eql(users)
    ))
  })

  describe('#dropWhile(array, [predicate=_.identity], [thisArg])', () => {
    let users

    beforeEach(() => {
      users = [
        { user: 'barney', active: false },
        { user: 'fred', active: false },
        { user: 'pebbles', active: true }
      ]
    })

    it('can take a function as a predicate', () => (
      resolve([1, 2, 3])
        .dropWhile(n => n < 3)
        .should.eventually.eql([3])
    ))

    it('works using the `_.matches` callback shorthand', () => (
      resolve(users)
        .dropWhile({ user: 'barney', active: false })
        .should.eventually.eql([
          { user: 'fred', active: false },
          { user: 'pebbles', active: true }
        ])
    ))

    it('works using the `_.matchesProperty` callback shorthand', () => (
      resolve(users)
        .dropWhile(['active', false])
        .should.eventually.eql([
          { user: 'pebbles', active: true }
        ])
    ))

    it('works using the `_.property` callback shorthand', () => (
      resolve(users)
        .dropWhile('active')
        .should.eventually.eql(users)
    ))
  })

  describe('.dropWhile(array, [predicate=_.identity], [thisArg])', () => {
    let users

    beforeEach(() => {
      users = [
        { user: 'barney', active: false },
        { user: 'fred', active: false },
        { user: 'pebbles', active: true }
      ]
    })

    it('can take a function as a predicate', () => (
      Promdash.dropWhile([1, 2, 3], n => n < 3)
        .should.eventually.eql([3])
    ))

    it('works using the `_.matches` callback shorthand', () => (
      Promdash.dropWhile(users, { user: 'barney', active: false })
        .should.eventually.eql([
          { user: 'fred', active: false },
          { user: 'pebbles', active: true }
        ])
    ))

    it('works using the `_.matchesProperty` callback shorthand', () => (
      Promdash.dropWhile(users, ['active', false])
        .should.eventually.eql([
          { user: 'pebbles', active: true }
        ])
    ))

    it('works using the `_.property` callback shorthand', () => (
      Promdash.dropWhile(users, 'active')
        .should.eventually.eql(users)
    ))
  })

  describe('#fill(array, value, [start=0], [end=array.length])', () => {
    it('fill an already filled array', () => (
      resolve([1, 2, 3])
        .fill('a')
        .should.eventually.eql(['a', 'a', 'a'])
    ))

    it('fills an array of undefined values', () => (
      resolve(Array(3))
        .fill(2)
        .should.eventually.eql([2, 2, 2])
    ))

    it('fills a range of an array', () => (
      resolve([4, 6, 8])
        .fill('*', 1, 2)
        .should.eventually.eql([4, '*', 8])
    ))
  })

  describe('.fill(array, value, [start=0], [end=array.length])', () => {
    it('fill an already filled array', () => (
      Promdash.fill([1, 2, 3], 'a')
        .should.eventually.eql(['a', 'a', 'a'])
    ))

    it('fills an array of undefined values', () => (
      Promdash.fill(Array(3), 2)
        .should.eventually.eql([2, 2, 2])
    ))

    it('fills a range of an array', () => (
      Promdash.fill([4, 6, 8], '*', 1, 2)
        .should.eventually.eql([4, '*', 8])
    ))
  })

  describe('#findIndex(array, [predicate=_.identity], [thisArg])', () => {
    let users

    beforeEach(() => {
      users = [
        { user: 'barney', active: false },
        { user: 'fred', active: false },
        { user: 'pebbles', active: true }
      ]
    })

    it('can take a function as a predicate', () => (
      resolve(users)
        .findIndex(chr => chr.user === 'barney')
        .should.eventually.equal(0)
    ))

    it('works using the `_.matches` callback shorthand', () => (
      resolve(users)
        .findIndex({ user: 'fred', active: false })
        .should.eventually.equal(1)
    ))

    it('works using the `_.matchesProperty` callback shorthand', () => (
      resolve(users)
        .findIndex(['active', false])
        .should.eventually.equal(0)
    ))

    it('works using the `_.property` callback shorthand', () => (
      resolve(users)
        .findIndex('active')
        .should.eventually.equal(2)
    ))
  })

  describe('.findIndex(array, [predicate=_.identity], [thisArg])', () => {
    let users

    beforeEach(() => {
      users = [
        { user: 'barney', active: false },
        { user: 'fred', active: false },
        { user: 'pebbles', active: true }
      ]
    })

    it('can take a function as a predicate', () => (
      Promdash.findIndex(users, chr => chr.user === 'barney')
        .should.eventually.equal(0)
    ))

    it('works using the `_.matches` callback shorthand', () => (
      Promdash.findIndex(users, { user: 'fred', active: false })
        .should.eventually.equal(1)
    ))

    it('works using the `_.matchesProperty` callback shorthand', () => (
      Promdash.findIndex(users, ['active', false])
        .should.eventually.equal(0)
    ))

    it('works using the `_.property` callback shorthand', () => (
      Promdash.findIndex(users, 'active')
        .should.eventually.equal(2)
    ))
  })

  describe('#findLastIndex(array, [predicate=_.identity], [thisArg])', () => {
    let users

    beforeEach(() => {
      users = [
        { user: 'barney', active: true },
        { user: 'fred', active: false },
        { user: 'pebbles', active: false }
      ]
    })

    it('can take a function as a predicate', () => (
      resolve(users)
        .findLastIndex(chr => chr.user === 'pebbles')
        .should.eventually.equal(2)
    ))

    it('works using the `_.matches` callback shorthand', () => (
      resolve(users)
        .findLastIndex({ user: 'barney', active: true })
        .should.eventually.equal(0)
    ))

    it('works using the `_.matchesProperty` callback shorthand', () => (
      resolve(users)
        .findLastIndex(['active', false])
        .should.eventually.equal(2)
    ))

    it('works using the `_.property` callback shorthand', () => {
      return resolve(users)
        .findLastIndex('active')
        .should.eventually.equal(0)
    })
  })

  describe('.findLastIndex(array, [predicate=_.identity], [thisArg])', () => {
    let users

    beforeEach(() => {
      users = [
        { user: 'barney', active: true },
        { user: 'fred', active: false },
        { user: 'pebbles', active: false }
      ]
    })

    it('can take a function as a predicate', () => (
      Promdash.findLastIndex(users, chr => chr.user === 'pebbles')
        .should.eventually.equal(2)
    ))

    it('works using the `_.matches` callback shorthand', () => (
      Promdash.findLastIndex(users, { user: 'barney', active: true })
        .should.eventually.equal(0)
    ))

    it('works using the `_.matchesProperty` callback shorthand', () => (
      Promdash.findLastIndex(users, ['active', false])
        .should.eventually.equal(2)
    ))

    it('works using the `_.property` callback shorthand', () => (
      Promdash.findLastIndex(users, 'active')
        .should.eventually.equal(0)
    ))
  })

  describe('#first(array)', () => {
    it('returns the first element', () => (
      resolve([1, 2, 3])
        .first()
        .should.eventually.equal(1)
    ))

    it('return undefined if there are no elements', () => (
      resolve([])
        .first()
        .should.eventually.be.undefined
    ))
  })

  describe('.first(array)', () => {
    it('returns the first element', () => (
      Promdash.first([1, 2, 3])
        .should.eventually.equal(1)
    ))

    it('return undefined if there are no elements', () => (
      Promdash.first([])
        .should.eventually.be.undefined
    ))
  })

  describe('#flatten(array, [isDeep])', () => {
    it('in shallow mode', () => (
      resolve([1, [2, 3, [4]]])
        .flatten()
        .should.eventually.eql([1, 2, 3, [4]])
    ))

    it('in deep mode', () => (
      resolve([1, [2, 3, [4]]])
        .flattenDeep()
        .should.eventually.eql([1, 2, 3, 4])
    ))
  })

  describe('.flatten(array, [isDeep])', () => {
    it('in shallow mode', () => (
      Promdash.flatten([1, [2, 3, [4]]])
        .should.eventually.eql([1, 2, 3, [4]])
    ))

    it('in deep mode', () => (
      Promdash.flattenDeep([1, [2, 3, [4]]])
        .should.eventually.eql([1, 2, 3, 4])
    ))
  })

  // ... you get the picture
})
