import { assert } from 'chai'

// Use functions and not arrow functions (() =>)
// https://mochajs.org/#arrow-functions
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
    // You can describe more use cases for the member indexof() here...
  })
  // You can describe tests for more members of Array here...
})
