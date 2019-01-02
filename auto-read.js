const fs = require('fs-extra')
const { join } = require('path')

let getConfigByDir = ({folderTitleMap, destpath}) => {
    let getSideBar = findSync(destpath, folderTitleMap)
    // order array
    return Object.keys(folderTitleMap).reduce((pre, cur) => [ ...pre, getSideBar.find(item => item.key === cur) ], [])
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
                let key = pathArray.slice(-2, -1).join('')
                let item = result.find(item => item.key === key)
                item && item.children.push(pathArray.slice(-2).join('/'))
            }
        }
    }
    finder(startPath)
    return result
}

module.exports = async options => {
    let { destpath } = options
    let vuepressConfigPath = destpath + '/.vuepress/config.js'
    let vuepressConfig = await fs.readFile(vuepressConfigPath, 'utf-8')

    // override sidebar
    let jsPrefix = 'module.exports = '
    let jsonStr = vuepressConfig.replace(jsPrefix, '')
    let jsonData = eval(`(${jsonStr})`)
    jsonData.themeConfig.sidebar = getConfigByDir(options)
    let overrideStr = jsPrefix + JSON.stringify(jsonData)

    await fs.outputFile(vuepressConfigPath, overrideStr)
}