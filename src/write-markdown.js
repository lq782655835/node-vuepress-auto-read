const fs = require('fs-extra')
const path = require('path')
const test = require('./util')

let writeFile = async ({ blogUrl, markdown }, fullSidebar) => {
    let contentArr = fullSidebar.reduce((pre, folderItem) => {
        pre.push(`# ${folderItem.title}`)
        folderItem.children.forEach((path, index) => {
            let title = folderItem.childrenTitles[index] || path
            let url = encodeURI(`${blogUrl}/${path.replace('.md', '.html')}`)
            pre.push(`* [${title}](${url})`)
        })
        return [...pre]
    }, [])
    await fs.outputFile(markdown, contentArr.join('\n'))
}

let writeMarkdown = async (mapArray, { rootPath, blogUrl, markdown }) => {
    let folderChildrenWithTitle = mapArray.map(async (folderItem, fIndex) => {
        let promises = folderItem.children.map(path => fs.readFile(rootPath + '/' + path, 'utf-8'))
        let contents = await Promise.all(promises)
        return new Promise((resolve, reject) => {
            resolve({ ...folderItem, childrenTitles: test.getMdTitles(contents) })
        })
    })
    let fullSidebar = await Promise.all(folderChildrenWithTitle)
    writeFile({ blogUrl, markdown }, fullSidebar)
}

module.exports = writeMarkdown
