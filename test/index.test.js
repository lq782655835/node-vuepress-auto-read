const { expect } = require('chai')
const getMdTitles = require('../src/util').getMdTitles

describe('test/util.test.js', function() {
    it('get markdown title', function() {
        let testStr = '# this is a test title \n wrewr'
        let title = getMdTitles([testStr])[0]

        expect(title.trim()).to.equal('this is a test title')
    })
})