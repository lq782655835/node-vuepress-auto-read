const fs = require('fs-extra')
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

let writeMarkdown = async (mapArray, options) => {
    let { rootPath, blogUrl, markdown } = options

    // get articles title for each folder item
    let folderChildrenWithTitle = mapArray.map(async (folderItem, fIndex) => {
        let promises = folderItem.children.map(path => fs.readFile(rootPath + '/' + path, 'utf-8'))
        let contents = await Promise.all(promises)
        return new Promise((resolve, reject) => {
            resolve({ ...folderItem, childrenTitles: test.getMdTitles(contents) })
        })
    })

    // all folders
    let fullSidebar = await Promise.all(folderChildrenWithTitle)
    writeFile(options, fullSidebar)
}

module.exports = writeMarkdown
