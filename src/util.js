let getMdTitles = contents =>
    contents.map(md => {
        let regexArr = /#(\s+)([\s\S]*?)\n/g.exec(md)
        return (regexArr && regexArr[2]) || ''
    })

module.exports = {
    getMdTitles
}
