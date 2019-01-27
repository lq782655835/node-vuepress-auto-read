const fs = require('fs-extra')
const { join } = require('path')
const writeVuepressConfig = require('./write-vuepress-config-sidebar')
const writeMarkdown = require('./write-markdown')

let getConfigByDir = ({ rootPath, folderTitleMap }) => {
    let getSideBar = findSync(rootPath, folderTitleMap)
    // order array
    return Object.keys(folderTitleMap).reduce((pre, cur) => {
        let curItem = getSideBar.find(item => item.key === cur)
        if (!curItem) return pre
        return [...pre, curItem]
    }, [])
}

let findSync = (startPath, titleMap) => {
    let result = []
    function finder(path) {
        let files = fs.readdirSync(path)
        for (val of files) {
            let fPath = join(path, val)
            let stats = fs.statSync(fPath)

            let includeDirTitle = titleMap[val]
            let isValidDir = stats.isDirectory() && includeDirTitle
            let isValidFile = stats.isFile() && val.endsWith('.md')

            if (isValidDir) {
                result.push({
                    key: val,
                    title: includeDirTitle,
                    collapsable: true,
                    children: []
                })
                finder(fPath)
            }

            if (isValidFile) {
                let pathArray = fPath.split('/')
                let folderName = pathArray.slice(-2, -1).join('')
                let folderItem = result.find(item => item.key === folderName)
                folderItem && folderItem.children.push(pathArray.slice(-2).join('/'))
            }
        }
    }
    finder(startPath)
    return result
}

module.exports = async options => {
    let { rootPath, blogUrl, markdown } = options
    let sidebar = getConfigByDir(options)

    // override sidebar
    let vuepressConfigPath = rootPath + '/.vuepress/config.js'
    writeVuepressConfig(vuepressConfigPath, sidebar)

    // override readme markdown
    blogUrl && writeMarkdown(sidebar, options)
}
