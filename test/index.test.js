const { expect } = require('chai')

describe('test/index.test.js', function() {
    it('这是一个测试文件', function() {
        expect(1).to.equal(1)
        expect('123').to.be.a('string');
        expect([1, 2, 3]).to.include(2)
        expect('everything').to.be.ok
    })
})