const fs = require('fs-extra')
const path = require('path')

let readMarkdown = (mapArray, { destpath, blogUrl }) => {
    let resultMd = []
    mapArray.forEach(async (folderItem, fIndex) => {
        let promises = folderItem.children.map(path => fs.readFile((destpath + '/' + path), 'utf-8'))
        let contents = await Promise.all(promises)
        contents = contents.map(md => /#(\s+)(\S*)\n/g.exec(md)[2])

        resultMd.push(`# ${folderItem.title}`)
        folderItem.children.forEach((path, index) => {
            resultMd.push(`* [${contents[index]}](${blogUrl}/${path})`)
        })

        if (mapArray.length - 1 === fIndex) {
            console.log(resultMd)
            let resultStr = resultMd.join('\n')
            await fs.outputFile('./README.md', resultStr)
        }
    })
}

module.exports = readMarkdown
