const { expect } = require('chai')
const auto = require('../auto-read')

describe('test/index.test.js', function() {
    it('这是一个测试文件', function() {
        let params = {
            config: './package.json',
            destpath: './docs/.vuepress/config.js'
        }
        auto(params)
        expect(1).to.equal(1)
        expect('123').to.be.a('string');
        expect([1, 2, 3]).to.include(2)
        expect('everything').to.be.ok
    })
})