// __tests__/sum-test.js
jest.dontMock('../static_src/js/sum');

describe('sum', function() {
 it('adds 1 + 2 to equal 3', function() {
   var sum = require('../static_src/js/sum');
   expect(sum(1, 2)).toBe(3);
 });
});