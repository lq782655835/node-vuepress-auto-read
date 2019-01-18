const fs = require('fs-extra')
const path = require('path')

let readMarkdown = (mapArray, { destpath, blogUrl }) => {
    let resultMd = []
    let increse = 0
    mapArray.forEach(async (folderItem, fIndex) => {
        let promises = folderItem.children.map(path => fs.readFile((destpath + '/' + path), 'utf-8'))
        let contents = await Promise.all(promises)
        contents = contents.map(md => {
            let regexArr = /#(\s+)([\s\S]*?)\n/g.exec(md)
            return (regexArr && regexArr[2]) || ''
        })

        resultMd.push(`# ${folderItem.title}`)
        folderItem.children.forEach((path, index) => {
            let title = `${contents[index] || path}`
            let url = encodeURI(`${blogUrl}/${path.replace('.md', '.html')}`)
            resultMd.push(`* [${title}](${url})`)
        })

        increse++
        if (mapArray.length - 1 === increse) {
            console.log(resultMd)
            let resultStr = resultMd.join('\n')
            await fs.outputFile('./README.md', resultStr)
        }
    })
}

module.exports = readMarkdown
